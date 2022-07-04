import type React from 'react'
import {useRouter} from 'next/router'
import {Group, Button} from '@mantine/core'
import {trpc} from '@/utils/trpc'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionTable from '@/components/tenants/TransactionTable'
import TenantModal from '@/components/tenants/TenantModal'

export default function TenantPage() {
	// const [opened, setOpened] = useState(false)

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

	return (
		<div className='container m-10'>

			<TenantModal props={{title: 'New Tenant', triggerButtonName: 'Add Tenant', confirmButtonName: 'Register'}} />

			<SummaryCard tenant={tenant} />
			{/* <Group className='my-2'>
				<Button radius='md' size='md' color='green' variant='light' onClick={() => setOpened(true)}>New Transaction</Button>
			</Group> */}
			<TenantModal props={{title: 'New Transaction', triggerButtonName: 'New Transaction', confirmButtonName: 'Register'}} />
			<TransactionTable transactions={tenant.transactions} />
		</div>
	)
}
