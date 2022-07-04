import type React from 'react'
import {useRouter} from 'next/router'
import {trpc} from '@/utils/trpc'
import SummaryCard from '@/components/tenants/SummaryCard'
import TransactionTable from '@/components/tenants/TransactionTable'
import DetailsModal from '@/components/tenants/DetailsModal'

export default function TenantPage() {
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

			<DetailsModal title='New Tenant' submitButtonName='Register' />

			<SummaryCard tenant={tenant} />
			<button type='button' className='my-3 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
				New Transaction
			</button>
			<TransactionTable transactions={tenant.transactions} />
		</div>
	)
}
