import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your frontend URL
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

// Apply middleware to specific paths
export const config = {
  matcher: "/api/:path*", // Apply only to API routes
};
