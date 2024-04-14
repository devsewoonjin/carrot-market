import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}
const publicOnlyUrl: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exist = publicOnlyUrl[request.nextUrl.pathname];
  if (!session.id) {
    // 로그인 안한 상태
    if (!exist) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // 로그인한 상태
    if (exist) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
  console.log("Hello");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
