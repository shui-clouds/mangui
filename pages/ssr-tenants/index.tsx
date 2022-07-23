import type React from 'react'
import {useModals} from '@mantine/modals'
import {Button} from '@mantine/core'
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
		<div className='container m-10 p-5'>
			<Button variant='light' radius='md' size='md' onClick={openContentModal}>New Tenant</Button>
			{tenants?.length && tenants.map((tenant) => (
				<>
					<TenantDetailsCard key={tenant.id} tenant={tenant} />
					<Link href={`ssr-tenants/${tenant.id}`}>View</Link>
				</>
			))}
		</div>
	)
}

export async function getServerSideProps() {
	const tenants = await getTenants()
	return {
		props: {tenants},
	}
}
