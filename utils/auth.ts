import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "true";
}

export function requireAdminAuth() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }
}

export function setAdminSession() {
  cookies().set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}
