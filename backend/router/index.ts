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
	.query('get-transaction', {
		input: z.string(),
		async resolve(req) {
			const transaction = await prisma.transaction.findUnique({
				where: {id: req.input},
			})
			if (!transaction) throw Error(`No transaction found with id ${req.input}`)
			return transaction
		},
	})
	// Tenant inputs variable
	.mutation('create-tenant', {
		input: z.object({
			name: z.string().min(2),
			email: z.string().optional(),
			createdAt: z.string(),
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
	.mutation('update-tenant', {
		input: z.object({
			id: z.string().min(1),
			name: z.string().min(2),
			email: z.string().optional(),
			balance: z.number(),
		}),
		async resolve(req) {
			const updateTenant = await prisma.tenant.update({
				where: {
					id: req.input.id,
				},
				data: {
					name: req.input.name,
					email: req.input.email,
					balance: req.input.balance,
				},
			})
			return {success: true, updateTenant}
		},
	})
	.mutation('create-transaction', {
		input: z.object({
			reference: z.string(),
			amount: z.number().min(1),
			date: z.string(),
			tenantId: z.string(),
		}),
		async resolve(req) {
			const transaction = await prisma.transaction.create({
				data: {
					reference: req.input.reference,
					amount: req.input.amount,
					date: req.input.date,
					tenantId: req.input.tenantId,
				},
			})
			return {success: true, transaction}
		},
	})
	// re-use objects
	.mutation('update-transaction', {
		input: z.object({
			id: z.string(),
			reference: z.string(),
			amount: z.number().min(1),
			date: z.string(),
			tenantId: z.string(),
		}),
		async resolve(req) {
			const updatedTransaction = await prisma.transaction.update({
				where: {
					id: req.input.id,
				},
				data: {
					reference: req.input.reference,
					amount: req.input.amount,
					date: req.input.date,
					tenantId: req.input.tenantId,
				},
			})
			return {success: true, updatedTransaction}
		},
	})

export type AppRouter = typeof appRouter
