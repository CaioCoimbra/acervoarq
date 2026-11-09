import type { NextApiRequest, NextApiResponse } from "next"

import { serializeClearedSessionCookie } from "../../../lib/auth"

type LogoutResponse = { message?: string; error?: string }

export default function logout(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Método não permitido." })
  }

  res.setHeader("Set-Cookie", serializeClearedSessionCookie())
  return res.status(200).json({ message: "Sessão encerrada." })
}
