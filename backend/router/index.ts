import * as trpc from '@trpc/server'
import {z} from 'zod'
import {prisma} from '@/backend/utils/prisma'

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
				where: {id: req.input},
				include: {transactions: true},
			})
			if (!tenant) throw Error(`No tenant found with id ${req.input}`)
			return tenant
		},
	})
	.query('get-transactions', {
		input: z.string(),
		async resolve(req) {
			const transactions = await prisma.transaction.findMany({
				where: {tenantId: req.input},
			})
			return transactions
		},
	})
	.mutation('create-tenant', {
		input: z.object({
			name: z.string().min(2),
			email: z.string(),
			createdAt: z.date(),
			balance: z.number(),
		}),
		async resolve({input}) {
			const tenant = await prisma.tenant.create({
				data: {
					name: input.name,
					email: input.email,
					createdAt: input.createdAt,
					balance: input.balance,
				},
			})
			return {success: true, tenant}
		},
	})

export type AppRouter = typeof appRouter
