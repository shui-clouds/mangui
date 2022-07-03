import {InferGetServerSidePropsType} from 'next'
import type React from 'react'
import {Button} from '@mantine/core'
import {useRouter} from 'next/router'
import {trpc} from '@/utils/trpc'
import {inferQueryResponse} from './api/trpc/[trpc]'
import InfoCard from '@/components/tenants/Info'
import TransactionTable from '@/components/tenants/TransactionTable'

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
			<button type='button' data-modal-toggle='authentication-modal' className='my-3 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
				Add Tenant
			</button>
			<InfoCard tenant={tenant} />
			<button type='button' className='my-3 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
				New Transaction
			</button>
			<TransactionTable transactions={tenant.transactions} />
		</div>
	)
}
