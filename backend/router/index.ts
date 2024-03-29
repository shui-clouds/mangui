import * as trpc from '@trpc/server'
import {z} from 'zod'
import {prisma} from '@/backend/utils/prisma'
import * as db from '@/lib/db'

export const appRouter = trpc
	.router()
	.query('get-tenants', {
		resolve: db.getTenants,
	})
	.query('get-tenant', {
		input: z.string().min(1),
		resolve: (req) => db.getTenant(req.input),
	})
	.query('get-transactions', {
		input: z.string(),
		resolve: (req) => db.getTransactions(req.input),
	})
	.query('get-transaction', {
		input: z.string(),
		resolve: (req) => db.getTransaction(req.input),
	})
	.query('get-property', {
		input: z.string(),
		resolve: (req) => db.getProperty(req.input),
	})
	.query('get-properties', {
		resolve: db.getProperties,
	})
	.query('get-room', {
		input: z.string().min(1),
		resolve: (req) => db.getRoom(req.input),
	})
	.query('get-rooms', {
		input: z.string(),
		resolve: (req) => db.getRooms(req.input),
	})
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
			amount: z.number(),
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
	.mutation('create-property', {
		input: z.object({
			name: z.string().min(1),
			address: z.string().min(1),
		}),
		async resolve({input}) {
			const property = await prisma.property.create({
				data: {
					name: input.name,
					address: input.address,
				},
			})
			return {success: true, property}
		},
	})
	.mutation('update-property', {
		input: z.object({
			id: z.string().min(1),
			name: z.string().min(1),
			address: z.string().min(1),
		}),
		async resolve(req) {
			const updateProperty = await prisma.property.update({
				where: {
					id: req.input.id,
				},
				data: {
					name: req.input.name,
					address: req.input.address,
				},
			})
			return {success: true, updateProperty}
		},
	})
	.mutation('create-room', {
		input: z.object({
			number: z.number(),
			rent: z.number().min(1),
			description: z.string().optional(),
			propertyId: z.string(),
			tenantId: z.string().optional(),
		}),
		async resolve(req) {
			const transaction = await prisma.room.create({
				data: {
					number: req.input.number,
					rent: req.input.rent,
					description: req.input.description,
					propertyId: req.input.propertyId,
					tenantId: req.input.tenantId,
				},
			})
			return {success: true, transaction}
		},
	})
	.mutation('update-room', {
		input: z.object({
			id: z.string().min(1),
			number: z.number(),
			rent: z.number().min(1),
			description: z.string().optional(),
			tenantId: z.string().optional(),
		}),
		async resolve(req) {
			const updateRoom = await prisma.room.update({
				where: {
					id: req.input.id,
				},
				data: {
					number: req.input.number,
					rent: req.input.rent,
					description: req.input.description,
					tenantId: req.input.tenantId,
				},
			})
			return {success: true, updateRoom}
		},
	})

export type AppRouter = typeof appRouter
