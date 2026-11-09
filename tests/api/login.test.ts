// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { NextApiRequest, NextApiResponse } from "next"
import { jwtVerify } from "jose"

vi.mock("../../src/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))
vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
}))

import { compare } from "bcryptjs"
import { prisma } from "../../src/lib/prisma"
import login from "../../src/pages/api/auth/login"

const compareMock = vi.mocked(compare) as unknown as {
  mockResolvedValue: (value: boolean) => void
}
const userModel = prisma.user as unknown as {
  findUnique: ReturnType<typeof vi.fn>
}
const jwtSecret = "test-jwt-secret-with-at-least-32-bytes-long"
const originalJwtSecret = process.env.JWT_SECRET

function makeRequest(body: unknown, method = "POST") {
  return { method, body } as unknown as NextApiRequest
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  }
}

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.JWT_SECRET = jwtSecret
  })

  afterEach(() => {
    if (originalJwtSecret === undefined) delete process.env.JWT_SECRET
    else process.env.JWT_SECRET = originalJwtSecret
  })

  it("returns 200 with a signed JWT in an HttpOnly cookie for valid credentials", async () => {
    userModel.findUnique.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
      passwordHash: "stored-password-hash",
    })
    compareMock.mockResolvedValue(true)
    const res = makeResponse()

    await login(makeRequest({ email: "PERSON@example.com", password: "valid-pass-1" }), res as unknown as NextApiResponse)

    expect(compare).toHaveBeenCalledWith("valid-pass-1", "stored-password-hash")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ user: { id: "user-1", email: "person@example.com" } })

    const cookie = res.setHeader.mock.calls.find(([name]) => name === "Set-Cookie")?.[1] as string
    expect(cookie).toContain("HttpOnly")
    expect(cookie).toContain("Path=/")
    expect(cookie).toContain("SameSite=Lax")
    expect(cookie).toContain("Max-Age=604800")
    const token = cookie.split(";", 1)[0].split("=")[1]
    const { payload, protectedHeader } = await jwtVerify(token, new TextEncoder().encode(jwtSecret))
    expect(protectedHeader.alg).toBe("HS256")
    expect(payload.sub).toBe("user-1")
    expect(payload.exp).toBeGreaterThan(payload.iat!)
  })

  it("returns the same 401 response for unknown email and incorrect password", async () => {
    compareMock.mockResolvedValue(false)
    userModel.findUnique.mockResolvedValue(null)
    const unknownEmailResponse = makeResponse()
    await login(
      makeRequest({ email: "missing@example.com", password: "wrong-password" }),
      unknownEmailResponse as unknown as NextApiResponse,
    )

    userModel.findUnique.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
      passwordHash: "stored-password-hash",
    })
    const incorrectPasswordResponse = makeResponse()
    await login(
      makeRequest({ email: "person@example.com", password: "wrong-password" }),
      incorrectPasswordResponse as unknown as NextApiResponse,
    )

    expect(compare).toHaveBeenCalledTimes(2)
    expect(unknownEmailResponse.status).toHaveBeenCalledWith(401)
    expect(incorrectPasswordResponse.status).toHaveBeenCalledWith(401)
    expect(unknownEmailResponse.json.mock.calls[0][0]).toEqual(
      incorrectPasswordResponse.json.mock.calls[0][0],
    )
  })

  it("returns 405 for methods other than POST", async () => {
    const res = makeResponse()

    await login(makeRequest({}, "GET"), res as unknown as NextApiResponse)

    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST")
    expect(res.status).toHaveBeenCalledWith(405)
  })
})
