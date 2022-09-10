import {prisma} from '@/backend/utils/prisma'

export async function getTenants() {
	const rawTenants = await prisma.tenant.findMany()
	const tenants = rawTenants.map((t) => ({...t, createdAt: ''}))

	return tenants
}

export async function getTransactions(tenantId: string) {
	const rawTransactions = await prisma.transaction.findMany({
		where: {tenantId},
	})
	// Date displayed one hour behind
	const transactions = rawTransactions.map((t) => ({...t, date: t.date.toISOString()}))
	return transactions
}

export async function getTransaction(transactionId: string) {
	const transaction = await prisma.transaction.findUnique({
		where: {id: transactionId},
	})
	if (!transaction) throw Error(`No transaction found with id ${transactionId}`)
	return transaction
}

export async function getProperty(propertyId: string) {
	const property = await prisma.property.findUnique({
		where: {id: propertyId},
	})
	if (!property) throw Error(`No property found with id ${propertyId}`)
	return property
}

export async function getProperties() {
	const rawProperties = await prisma.property.findMany()
	const properties = rawProperties.map((t) => ({...t, createdAt: ''}))

	return properties
}

export async function getTenant(tenantId: string) {
	const rawTenant = await prisma.tenant.findUnique({
		where: {id: tenantId},
		include: {transactions: true},
	})
	if (!rawTenant) throw Error(`No tenant found with id ${tenantId}`)

	const transactions = rawTenant.transactions.map((t) => ({...t, date: t.date.toISOString()}))
	const tenant = {...rawTenant, createdAt: '', transactions}

	return tenant
}

export async function getRooms(propertyId: string) {
	const rooms = await prisma.property.findUnique({
		where: {id: propertyId},
		include: {rooms: true},
	})
	return rooms
}

export async function getRoom(roomId: string) {
	const room = await prisma.room.findUnique({
		where: {id: roomId},
	})
	if (!room) throw Error(`No room found with id ${roomId}`)
	return room
}
