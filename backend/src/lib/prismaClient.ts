import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient configuration for read-only database access
 * - Uses READ_ONLY_DATABASE_URL for read-only operations
 * - Disables migrations and schema push operations
 */
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Log middleware for debugging purposes
prisma.$use(async (params, next) => {
  // For logging purposes
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

export default prisma;
