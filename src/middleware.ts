import { withAuth } from "next-auth/middleware"
export default withAuth

export const config = {
    matcher: [
        "/settings/:path*",
        "/alarms/:path*",
        "/history/:path*"
    ]
}
