// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { NextApiRequest, NextApiResponse } from "next"
import { SignJWT } from "jose"

import { createSessionToken, SESSION_COOKIE_NAME } from "../../src/lib/auth"
import { requireAuth } from "../../src/lib/requireAuth"

const jwtSecret = "require-auth-test-secret-with-at-least-32-bytes"
const originalJwtSecret = process.env.JWT_SECRET

function makeRequest(token?: string) {
  return {
    cookies: token ? { [SESSION_COOKIE_NAME]: token } : {},
  } as unknown as NextApiRequest
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }
}

describe("requireAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.JWT_SECRET = jwtSecret
  })

  afterEach(() => {
    if (originalJwtSecret === undefined) delete process.env.JWT_SECRET
    else process.env.JWT_SECRET = originalJwtSecret
  })

  it("returns the user id from a valid session token", async () => {
    const token = await createSessionToken("user-1")
    const res = makeResponse()

    await expect(requireAuth(makeRequest(token), res as unknown as NextApiResponse)).resolves.toEqual({
      userId: "user-1",
    })
    expect(res.status).not.toHaveBeenCalled()
  })

  it("returns 401 when the session cookie is missing", async () => {
    const res = makeResponse()

    await expect(requireAuth(makeRequest(), res as unknown as NextApiResponse)).resolves.toBeNull()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: "Não autenticado." })
  })

  it("returns 401 for invalid and expired tokens", async () => {
    const invalidToken = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("user-1")
      .sign(new TextEncoder().encode("another-secret-with-at-least-32-bytes"))
    const expiredToken = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("user-1")
      .setIssuedAt(0)
      .setExpirationTime(1)
      .sign(new TextEncoder().encode(jwtSecret))

    for (const token of [invalidToken, expiredToken]) {
      const res = makeResponse()
      await expect(requireAuth(makeRequest(token), res as unknown as NextApiResponse)).resolves.toBeNull()
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ error: "Não autenticado." })
    }
  })
})
