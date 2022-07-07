import type React from 'react'
import {useRouter} from 'next/router'
import {Button} from '@mantine/core'
import {useModals} from '@mantine/modals'
import {trpc} from '@/utils/trpc'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionTable from '@/components/tenants/TransactionTable'
import TenantForm from '@/components/tenants/TenantForm'

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

	const openContentModal = () => {
		const id = modals.openModal({
			title: tenant.name,
			children: <TenantForm
				tenantId={tenant.id}
				onSuccessHandler={() => {
					refetch()
					modals.closeModal(id)
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
