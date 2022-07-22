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
	const transactions = rawTransactions.map((t) => ({...t, date: ''}))
	return transactions
}

export async function getTransaction(transactionId: string) {
	const transaction = await prisma.transaction.findUnique({
		where: {id: transactionId},
	})
	if (!transaction) throw Error(`No transaction found with id ${transactionId}`)
	return transaction
}

export async function getTenant(tenantId: string) {
	const rawTenant = await prisma.tenant.findUnique({
		where: {id: tenantId},
		include: {transactions: true},
	})
	if (!rawTenant) throw Error(`No tenant found with id ${tenantId}`)

	const transactions = rawTenant.transactions.map((t) => ({...t, date: ''}))
	const tenant = {...rawTenant, createdAt: '', transactions}

	return tenant
}
