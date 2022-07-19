import {prisma} from '@/backend/utils/prisma'

export const getTenants = async () => prisma.tenant.findMany()

export async function getTransactions(tenantId: string) {
	const transactions = prisma.transaction.findMany({
		where: {tenantId},
	})
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
	const tenant = await prisma.tenant.findUnique({
		where: {id: tenantId},
		include: {transactions: true},
	})
	if (!tenant) throw Error(`No tenant found with id ${tenantId}`)
	return tenant
}
