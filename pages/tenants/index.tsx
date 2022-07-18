import type React from 'react'
import {useModals} from '@mantine/modals'
import {Button} from '@mantine/core'
import {trpc} from '@/utils/trpc'
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

	const openContentModal = () => {
		const id = modals.openModal({
			title: 'New Tenant',
			children: <TenantForm
				onSuccessHandler={() => {
					refetch()
					modals.closeModal(id)
				}}
			/>,
		})
	}
	if (isLoading) return 'LODING WAAAA'
	console.dir(currentTenants)

	return (

		<div className='container m-10 p-5'>
			<Button color='green' variant='light' radius='md' size='md' onClick={openContentModal}>New Tenant</Button>

			{currentTenants?.length && currentTenants.map((tenant) => (
				<SummaryCard tenant={tenant} handler={openContentModal} />

			))}

		</div>
	)
}
