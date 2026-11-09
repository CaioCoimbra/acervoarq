import { jwtVerify } from "jose"
import type { NextApiRequest, NextApiResponse } from "next"

import { getJwtSecretKey, SESSION_COOKIE_NAME } from "./auth"

type UnauthorizedResponse = { error: string }

export type AuthenticatedSession = { userId: string }

export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse<UnauthorizedResponse>,
): Promise<AuthenticatedSession | null> {
  const token = req.cookies?.[SESSION_COOKIE_NAME]

  if (!token) {
    res.status(401).json({ error: "Não autenticado." })
    return null
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey(), {
      algorithms: ["HS256"],
    })

    if (!payload.sub) {
      res.status(401).json({ error: "Não autenticado." })
      return null
    }

    return { userId: payload.sub }
  } catch {
    res.status(401).json({ error: "Não autenticado." })
    return null
  }
}
