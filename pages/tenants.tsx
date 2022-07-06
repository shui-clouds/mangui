import {InferGetServerSidePropsType} from 'next'
import type React from 'react'
import {Button, Group} from '@mantine/core'
import {useModals} from '@mantine/modals'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from './api/trpc/[trpc]'
import SummaryCard from '@/components/tenants/SummaryCard'
import TenantForm from '@/components/tenants/TenantForm'

export default function Home2() {
	const modals = useModals()

	const {
		data: currentTenants,
		refetch,
		isLoading,
	} = trpc.useQuery(['get-tenants'], {
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	})

	// const openContentModal = () => {
	// 	const id = modals.openModal({
	// 		title: 'Add Tenant',
	// 		children: <TenantForm />,

	// 	})
	// }

	if (isLoading) return 'LODING WAAAA'
	console.dir(currentTenants)
	return (

		<div className='container m-10 p-5'>
			{/* <Button color='green' variant='light' radius='md' size='md' onClick={openContentModal}>Add Tenant</Button> */}

			{currentTenants?.length && currentTenants.map((tenant) => (
				<SummaryCard tenant={tenant} key={tenant.id} />
			))}

		</div>
	)
}
