import { compare } from "bcryptjs"
import type { NextApiRequest, NextApiResponse } from "next"

import { createSessionToken, DUMMY_PASSWORD_HASH, serializeSessionCookie } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"

type LoginResponse = {
  user?: { id: string; email: string }
  error?: string
}

const INVALID_CREDENTIALS = { error: "Email ou senha inválidos." }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Método não permitido." })
  }

  if (!isRecord(req.body)) {
    return res.status(401).json(INVALID_CREDENTIALS)
  }

  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : ""
  const password = typeof req.body.password === "string" ? req.body.password : ""

  if (!isValidEmail(email) || !password || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(401).json(INVALID_CREDENTIALS)
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    })
    const passwordMatches = await compare(password, user?.passwordHash ?? DUMMY_PASSWORD_HASH)

    if (!user || !passwordMatches) {
      return res.status(401).json(INVALID_CREDENTIALS)
    }

    const token = await createSessionToken(user.id)
    res.setHeader("Set-Cookie", serializeSessionCookie(token))

    return res.status(200).json({ user: { id: user.id, email: user.email } })
  } catch {
    return res.status(500).json({ error: "Erro interno." })
  }
}
