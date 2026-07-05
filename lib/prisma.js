import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function assertDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
  }
}

const prisma =
  globalForPrisma.__doctorClinicPrisma ??
  (() => {
    assertDatabaseUrl();

    return new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["warn", "error"]
          : ["error"],
    });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__doctorClinicPrisma = prisma;
}

export default prisma;
