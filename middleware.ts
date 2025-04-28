
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  let role = "sign-in";
  if (userId) {
    role = (sessionClaims?.metadata as { role?: string })?.role ?? "patient";
  }

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    const redirectUrl = new URL(`/${role}`, url.origin);

    if (url.pathname !== redirectUrl.pathname) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next(); // Avoid infinite loop
  }

  return NextResponse.next(); // Authorized
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};




//old api with export routematchers
// import { clerkMiddleware} from "@clerk/nextjs/server";
// import { routeMatchers } from "./lib/routes";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// const checkRoleAndRedirect = (
//   req: NextRequest,
//   role: string | undefined,
//   allowedRoles: keyof typeof routeMatchers
// ): NextResponse | undefined => {
//   if (routeMatchers[allowedRoles](req) && role !== allowedRoles) {
//     const url = new URL("/", req.url);
//     console.log("unauthorized access, redirecting to:", url);
//     return NextResponse.redirect(url);
//   }
//  }


// // const matchers = Object.keys(routeAccess).map((route) => ({
// //   matcher: createRouteMatcher([route]),
// //   allowedRoles: routeAccess[route],
// // }))
// export default clerkMiddleware(async (auth, request) => { 
//   const { userId, sessionClaims } = await auth();
 
  
//   const role = (sessionClaims?.metadata as { role?: string })?.role;//public metadata

//   // role checks
//   const response =
//     checkRoleAndRedirect(request, role, "admin", ) ||
//     checkRoleAndRedirect(request, role, "doctor"); 
//     checkRoleAndRedirect(request, role, "patient");
//   if (response) return response;
  
//   // console.log(role);
//   // for (const { matcher, allowedRoles } of matchers) {
//   //   if (role && userId) {
//   //     if (matcher(request) && !allowedRoles.includes(role)) {
//   //        return NextResponse.redirect(new URL('/${role}', request.url));
//   //      }
//   //    }
//   // }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };