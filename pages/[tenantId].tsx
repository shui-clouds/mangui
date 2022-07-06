import type React from 'react'
import {useRouter} from 'next/router'
import {Group, Button, LoadingOverlay} from '@mantine/core'
import {useModals} from '@mantine/modals'
import {showNotification, updateNotification} from '@mantine/notifications'
import {trpc} from '@/utils/trpc'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionTable from '@/components/tenants/TransactionTable'
import TenantForm from '@/components/tenants/TenantForm'
import {notifyAndRefetch} from '@/lib/component-helper'

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

	// notifyAndRefetch({
	// 	id: 'save-tenant-data',
	// 	updateTitle: 'Try again!',
	// 	updateMessage: 'fail',
	// 	color: 'red',
	// })

	const openContentModal = () => {
		const id = modals.openModal({
			title: tenant.name,
			children: <TenantForm
				tenantId={tenant.id}
				onConfirmHandler={async () => {
					modals.closeModal(id)
					// call from form??
					notifyAndRefetch({
						id: 'save-tenant-data',
						updateMessage: 'Changes have been saved.',
						handler: refetch,
						color: 'teal',
					})
				}}
			/>,
		})
	}

	return (
		<div className='container m-10'>
			<Button color='green' variant='light' radius='md' size='md' onClick={openContentModal}>Edit</Button>
			<SummaryCard tenant={tenant} />
			{/* <Group className='my-2'>
				<Button radius='md' size='md' color='green' variant='light' onClick={() => setOpened(true)}>New Transaction</Button>
			</Group> */}
			<Button color='green' variant='light' radius='md' size='md' onClick={openContentModal}>Add Tenant</Button>
			<TransactionTable transactions={tenant.transactions} />
		</div>
	)
}
