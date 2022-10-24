import type React from 'react'
import { useModals } from '@mantine/modals'
import { Button, Card, Container, Title } from '@mantine/core'
import Link from 'next/link'
import { trpc } from '@/utils/trpc'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TenantForm from '@/components/tenants/TenantForm'
import tenants from '@/remix/app/routes/tenants'

export default function TenantsPage() {
	const modals = useModals()

	const { data: currentTenants, isLoading } = trpc.useQuery(
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
		<Container size='md' className='mb-10'>
			<Title className='my-4 font-medium text-2xl'>Tenants</Title>
			<Button variant='light' radius='md' size='sm' onClick={openContentModal}>New Tenant</Button>
			{currentTenants?.map((tenant) => (
				<Card key={tenant.id} withBorder className='my-4'>
					<TenantDetailsCard key={tenant.id} tenant={tenant} />
					<h1 className='font-medium text-lg'>
						<Link href={`/csr-tenants/${tenant.id}`}>View</Link>
					</h1>
				</Card>
			))}
		</Container>
	)
}
