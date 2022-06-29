import * as trpc from "@trpc/server";
import { z } from "zod";
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
    input: z.number().min(0),
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
      name: z.string().min(2),
      balance: z.number(),
    }),
    async resolve({ input }) {
      const tenant = await prisma.tenant.create({
        data: {
          name: input.name,
          balance: input.balance,
        },
      });
      return { success: true, tenant: tenant };
    },
  });

export type AppRouter = typeof appRouter;
