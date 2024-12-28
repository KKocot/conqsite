export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login|authority|dashboard/policy|dashboard/tos|dashboard/docs|dashboard/units|dashboard/doctrines|dashboard/houses|unit|.*\\..*).*)",
  ],
};
