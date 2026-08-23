import { NextRequest, NextResponse } from "next/server";

// Protects every route under /admin with HTTP Basic Auth.
// Credentials come from env vars — set these in .env.local (dev)
// and in your hosting provider's env settings (production).
//   ADMIN_USERNAME=your-username
//   ADMIN_PASSWORD=your-password

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    const validUser = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUser || !validPassword) {
      // Fail closed: if env vars aren't set, don't let anyone in.
      return new NextResponse("Admin credentials are not configured.", {
        status: 500,
      });
    }

    if (user === validUser && password === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
