import { hash } from "bcryptjs"
import type { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "../../../lib/prisma"

const BCRYPT_ROUNDS = 12
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_BYTES = 72

type RegisterResponse = {
  user?: { id: string; email: string; createdAt: Date }
  error?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  )
}

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Método não permitido." })
  }

  if (!isRecord(req.body)) {
    return res.status(422).json({ error: "Dados inválidos." })
  }

  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : ""
  const password = typeof req.body.password === "string" ? req.body.password : ""

  if (
    !isValidEmail(email) ||
    Array.from(password).length < MIN_PASSWORD_LENGTH ||
    Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
  ) {
    return res.status(422).json({ error: "Email ou senha inválidos." })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return res.status(409).json({ error: "Email já cadastrado." })
    }

    const passwordHash = await hash(password, BCRYPT_ROUNDS)
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true, createdAt: true },
    })

    return res.status(201).json({
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    })
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return res.status(409).json({ error: "Email já cadastrado." })
    }

    return res.status(500).json({ error: "Erro interno." })
  }
}
