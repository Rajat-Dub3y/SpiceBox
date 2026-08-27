import mongoose from "mongoose";

// Assumption: backend lives inside the same Next.js app as API routes
// (app/api/**/route.ts), since the frontend is already Next.js — this
// avoids standing up a separate Express server. If you'd rather have a
// standalone Express backend instead, say so and I'll restructure this.
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not set. Add it to .env.local (and your host's env settings)."
  );
}

// Cache the connection across hot reloads in dev and across serverless
// invocations in production, so we don't open a new connection per request.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};
global._mongooseCache = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI as string);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
