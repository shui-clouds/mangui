import * as trpc from "@trpc/server";
import { date, z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query('get-tenants', {
    async resolve() {
      const tenants = await prisma.tenant.findMany()
      return tenants
    },
  })
  .query('get-tenant', {
    input: z.string(),
    async resolve(req) {
      const tenant = await prisma.tenant.findUnique({
        where: { id: req.input }
      })
      if (!tenant) throw Error(`No tenant found with id ${req.input}`)
      return tenant
    },
  })
  .mutation("create-tenant", {
    input: z.object({
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      email: z.string(),
      createdAt: z.date(),
      balance: z.number(),
    }),
    async resolve({ input }) {
      const tenant = await prisma.tenant.create({
        data: {
          first_name: input.first_name,
          last_name: input.last_name,
          email: input.email,
          createdAt: input.createdAt,
          balance: input.balance,
        },
      });
      return { success: true, tenant: tenant };
    },
  });

export type AppRouter = typeof appRouter;
