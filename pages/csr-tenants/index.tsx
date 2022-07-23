import type React from 'react'
import {useModals} from '@mantine/modals'
import {Button} from '@mantine/core'
import Link from 'next/link'
import {trpc} from '@/utils/trpc'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TenantForm from '@/components/tenants/TenantForm'

export default function TenantsPage() {
	const modals = useModals()

	const {data: currentTenants, isLoading} = trpc.useQuery(
		['get-tenants'],
		{
			refetchInterval: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	)

	const openContentModal = () => {
		const id = modals.openModal({
			title: 'New Tenant',
			children: <TenantForm
				close={() => { modals.closeModal(id) }}
			/>,
		})
	}
	if (isLoading) return 'LODING WAAAA'

	return (
		<div className='container m-10 p-5'>
			<Button variant='light' radius='md' size='md' onClick={openContentModal}>New Tenant</Button>
			{currentTenants?.length && currentTenants.map((tenant) => (
				<>
					<TenantDetailsCard key={tenant.id} tenant={tenant} />
					<Link href={`csr-tenants/${tenant.id}`}>View</Link>
				</>
			))}
		</div>
	)
}
