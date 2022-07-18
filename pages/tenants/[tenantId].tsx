import type React from 'react'
import {useRouter} from 'next/router'
import {Container, Title} from '@mantine/core'
import {useModals} from '@mantine/modals'
import {trpc} from '@/utils/trpc'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionCard from '@/components/tenants/TransactionCard'
import TenantForm from '@/components/tenants/TenantForm'
import TransactionForm from '@/components/tenants/TransactionForm'
import {InferQueryResponse} from '../api/trpc/[trpc]'

type Transaction = InferQueryResponse<'get-transaction'>

export default function TenantPage() {
	// const [opened, setOpened] = useState(false)
	const modals = useModals()

	const router = useRouter()

	const {tenantId} = router.query

	const {
		data: tenant,
		refetch,
		isLoading,
	} = trpc.useQuery(['get-tenant', tenantId?.toString() ?? ''], {
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	})

	if (isLoading || !tenant) return 'LODING WAAAA'

	console.dir(tenant)

	const openTenantEditModal = () => {
		const id = modals.openModal({
			title: tenant.name,
			children: <TenantForm
				tenant={tenant}
				onSuccessHandler={() => {
					refetch()
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
					refetch()
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
