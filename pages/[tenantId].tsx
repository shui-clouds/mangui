import type React from 'react'
import {useRouter} from 'next/router'
import {Container, Title} from '@mantine/core'
import {useModals} from '@mantine/modals'
// import {trpc} from '@/utils/trpc'
import {useState, useEffect} from 'react'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionCard from '@/components/tenants/TransactionCard'
import TenantForm from '@/components/tenants/TenantForm'
import TransactionForm from '@/components/tenants/TransactionForm'
import {InferQueryResponse} from './api/trpc/[trpc]'
import {prisma} from '@/backend/utils/prisma'

type Transaction = InferQueryResponse<'get-transaction'>

type Tenant = {
	id: string,
	balance: number,
	name: string,
	email: string,
	createdAt: Date,
	transactions: Transaction[],
}

export default function TenantPage({tenantData}: {tenantData: string}) {
	// const [opened, setOpened] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [currentData, setCurrentData] = useState(tenantData)

	const modals = useModals()
	const router = useRouter()

	const tenant: Tenant = JSON.parse(tenantData)

	const refreshData = () => {
		router.replace(router.asPath)
		setIsRefreshing(true)
	}
	useEffect(() => {
		setIsRefreshing(false)
	}, [tenantData])

	// const router = useRouter()

	// const {tenantId} = router.query

	// const {
	// 	data: tenant,
	// 	refetch,
	// 	isLoading,
	// } = trpc.useQuery(['get-tenant', tenantId?.toString() ?? ''], {
	// 	refetchInterval: false,
	// 	refetchOnReconnect: false,
	// 	refetchOnWindowFocus: false,
	// })

	if (!tenant) return 'LODING WAAAA'

	console.dir({tenant})

	const openTenantEditModal = () => {
		const id = modals.openModal({
			title: tenant.name,
			children: <TenantForm
				tenant={tenant}
				onSuccessHandler={(data) => {
					if (data) setCurrentData(data)
					// if (!isRefreshing) refreshData()
					modals.closeModal(id)
				}}
			/>,
		})
	}

	const openTransactionModal = (transaction?: Transaction) => {
		const id = modals.openModal({
			title: transaction ? 'Edit Transaction' : 'Add Transaction',
			children: <TransactionForm
				tenantId={tenant.id}
				transaction={transaction || undefined}
				onSuccessHandler={() => {
					// if (!isRefreshing) refreshData()
					modals.closeModal(id)
				}}
			/>,
		})
	}

	return (
		<Container style={{marginBottom: 25}} size='md'>
			<Title style={{marginBottom: 15, marginTop: 25}} order={2}>Overview</Title>
			<SummaryCard tenant={tenant} handler={openTenantEditModal} />
			<TransactionCard transactions={tenant.transactions} handler={openTransactionModal} />
		</Container>
	)
}

// TODO: add type to context
export async function getServerSideProps(context: any) {
	const {params} = context
	const response = await prisma.tenant.findUnique({
		where: {id: params.tenantId},
		include: {transactions: true},
	})
	// redirect to error page
	if (!response) throw Error('No tenant found')
	const tenantData = JSON.stringify(response)

	return {props: {tenantData}}
}
