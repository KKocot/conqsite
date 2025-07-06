export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login|home|authority|policy|tos|docs|dashboard/units|dashboard/doctrines|dashboard/artilleries|dashboard/maps|dashboard/houses|unit|.*\\..*).*)",
  ],
};
