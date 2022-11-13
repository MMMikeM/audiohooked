import argon2 from "argon2"
import { redirect } from "solid-start/server"
import { createCookieSessionStorage } from "solid-start/session"
import { db } from "./db"

type LoginForm = {
  username: string
  password: string
}

export async function register({ username, password }: LoginForm) {
  return db.insertInto("user").values({ username, password }).execute()
}

export async function login({ username, password }: LoginForm) {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirstOrThrow()

  if (!user || !argon2.verify(password, user.password)) return null
  return user
}

const sessionSecret = import.meta.env.SESSION_SECRET

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: true,
    secrets: sessionSecret || ["hello"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  },
})

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get("userId")
  if (!userId || typeof userId !== "string") return null
  return userId
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request)
  const userId = session.get("userId")
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== "string") {
    return null
  }
  try {
    return await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirstOrThrow()
  } catch {
    throw logout(request)
  }
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"))
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  })
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set("userId", userId)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  })
}
