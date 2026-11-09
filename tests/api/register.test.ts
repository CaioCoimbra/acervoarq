import { beforeEach, describe, expect, it, vi } from "vitest"
import type { NextApiRequest, NextApiResponse } from "next"

vi.mock("../../src/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))
vi.mock("bcryptjs", () => ({
  hash: vi.fn().mockResolvedValue("hashed-password"),
}))

import { hash } from "bcryptjs"
import { prisma } from "../../src/lib/prisma"
import register from "../../src/pages/api/auth/register"

const userModel = prisma.user as unknown as {
  findUnique: ReturnType<typeof vi.fn>
  create: ReturnType<typeof vi.fn>
}

function makeRequest(body: unknown, method = "POST") {
  return { method, body } as unknown as NextApiRequest
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  } as unknown as NextApiResponse
}

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates a user with a bcrypt hash and never returns the hash", async () => {
    const createdAt = new Date("2026-01-01T00:00:00.000Z")
    userModel.findUnique.mockResolvedValue(null)
    userModel.create.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
      passwordHash: "hashed-password",
      createdAt,
    })
    const res = makeResponse()

    await register(
      makeRequest({ email: " Person@Example.com ", password: "valid-pass-1" }),
      res,
    )

    expect(hash).toHaveBeenCalledWith("valid-pass-1", 12)
    expect(userModel.create).toHaveBeenCalledWith({
      data: { email: "person@example.com", passwordHash: "hashed-password" },
      select: { id: true, email: true, createdAt: true },
    })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      user: { id: "user-1", email: "person@example.com", createdAt },
    })
  })

  it("returns 409 when the email already exists", async () => {
    userModel.findUnique.mockResolvedValue({ id: "user-1" })
    const res = makeResponse()

    await register(makeRequest({ email: "person@example.com", password: "valid-pass-1" }), res)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(userModel.create).not.toHaveBeenCalled()
    expect(hash).not.toHaveBeenCalled()
  })

  it("returns 409 for a concurrent unique-email conflict", async () => {
    userModel.findUnique.mockResolvedValue(null)
    userModel.create.mockRejectedValue({ code: "P2002" })
    const res = makeResponse()

    await register(makeRequest({ email: "person@example.com", password: "valid-pass-1" }), res)

    expect(res.status).toHaveBeenCalledWith(409)
  })

  it("returns 422 for an invalid email or a password shorter than eight characters", async () => {
    for (const body of [
      { email: "not-an-email", password: "valid-pass-1" },
      { email: "person@example.com", password: "short7!" },
    ]) {
      const res = makeResponse()
      await register(makeRequest(body), res)
      expect(res.status).toHaveBeenCalledWith(422)
    }

    expect(userModel.findUnique).not.toHaveBeenCalled()
    expect(hash).not.toHaveBeenCalled()
  })

  it("returns 405 for methods other than POST", async () => {
    const res = makeResponse()

    await register(makeRequest({}, "GET"), res)

    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST")
    expect(res.status).toHaveBeenCalledWith(405)
  })
})
