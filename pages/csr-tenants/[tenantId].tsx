import type React from 'react'
import {useRouter} from 'next/router'
import {Container, Title} from '@mantine/core'
import {useModals} from '@mantine/modals'
import {trpc} from '@/utils/trpc'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TransactionCard from '@/components/transactions/TransactionCard'
import TenantForm from '@/components/tenants/TenantForm'

export default function TenantPage() {
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

	return (
		<Container style={{marginBottom: 25}} size='md'>
			<Title style={{marginBottom: 15, marginTop: 25}} order={2}>Overview</Title>
			<TenantDetailsCard tenant={tenant} handler={openTenantEditModal} />
			{tenant.transactions && (<TransactionCard transactions={tenant.transactions} />)}
		</Container>
	)
}
