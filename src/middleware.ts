export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/settings/:path*",
        "/alarms/:path*",
        "/history/:path*"
    ]
}
