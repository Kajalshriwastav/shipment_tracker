import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req) {
  const verify = req.Cookies.signOut;

  const url = req.url;

  if (!verify && url.includes('/dashboard')) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (verify && url === "/http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/dashboard"); 
  }

  return NextResponse.next();
}
