import { describe, expect, it, vi } from "vitest"
import type { NextApiRequest, NextApiResponse } from "next"

import logout from "../../src/pages/api/auth/logout"

function makeRequest(method = "POST") {
  return { method } as unknown as NextApiRequest
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  }
}

describe("POST /api/auth/logout", () => {
  it("expires the session cookie", () => {
    const res = makeResponse()

    logout(makeRequest(), res as unknown as NextApiResponse)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Sessão encerrada." })
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "acervoarq_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
    )
  })

  it("allows only POST", () => {
    const res = makeResponse()

    logout(makeRequest("GET"), res as unknown as NextApiResponse)

    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST")
    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.json).not.toHaveBeenCalledWith({ message: "Sessão encerrada." })
  })
})
