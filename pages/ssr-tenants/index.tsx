import type React from 'react'
import {useModals} from '@mantine/modals'
import {Button, Card, Container, Title} from '@mantine/core'
import {InferGetServerSidePropsType} from 'next'
import Link from 'next/link'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TenantForm from '@/components/tenants/TenantForm'
import {getTenants} from '@/lib/db'

export default function TenantsPage({tenants}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const modals = useModals()

	const openContentModal = () => {
		const id = modals.openModal({
			title: 'New Tenant',
			children: <TenantForm
				close={() => { modals.closeModal(id) }}
			/>,
		})
	}

	return (
		<Container size='md' className='mb-10'>
			<Title className='my-4 font-medium text-2xl'>Tenants</Title>
			<Button variant='light' radius='md' size='sm' onClick={openContentModal}>New Tenant</Button>
			{tenants.map((tenant) => (
				<Card key={tenant.id} withBorder className='my-4'>
					<TenantDetailsCard key={tenant.id} tenant={tenant} />
					<h1 className='font-medium text-lg'>
						<Link href={`/ssr-tenants/${tenant.id}`}>View</Link>
					</h1>
				</Card>
			))}
		</Container>
	)
}

export async function getServerSideProps() {
	const tenants = await getTenants()
	return {
		props: {tenants},
	}
}
