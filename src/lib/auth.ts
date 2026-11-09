import { jwtVerify, SignJWT } from "jose"

export const SESSION_COOKIE_NAME = "acervoarq_session"
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60
export const DUMMY_PASSWORD_HASH = "$2b$12$wwBSNaPY6mhKAqc2NqTZGuO84vDD4DwFugM6NufYn/fCAYefVilZ."

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET must contain at least 32 bytes.")
  }

  return new TextEncoder().encode(secret)
}

export async function createSessionToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getJwtSecretKey())
}

export async function getSessionUserId(token?: string): Promise<string | null> {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey(), { algorithms: ["HS256"] })
    return payload.sub ?? null
  } catch {
    return null
  }
}

export function serializeSessionCookie(token: string): string {
  const cookie = [
    `${SESSION_COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
  ]

  if (process.env.NODE_ENV === "production") {
    cookie.push("Secure")
  }

  return cookie.join("; ")
}

export function serializeClearedSessionCookie(): string {
  const cookie = [
    `${SESSION_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
  ]

  if (process.env.NODE_ENV === "production") {
    cookie.push("Secure")
  }

  return cookie.join("; ")
}
