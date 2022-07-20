import type React from 'react'
import {useRouter} from 'next/router'
import {Container, Title} from '@mantine/core'
import {trpc} from '@/utils/trpc'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TransactionListCard from '@/components/transactions/ListCard'

export default function TenantPage() {
	const router = useRouter()

	const {tenantId} = router.query

	if (tenantId === undefined || Array.isArray(tenantId)) {
		return 'Something went wrong!'
	}

	const {
		data: tenant,
		isLoading,
	} = trpc.useQuery(['get-tenant', tenantId], {
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	})

	if (isLoading || !tenant) return 'LODING WAAAA'

	console.dir(tenant)

	return (
		<Container size='md'>
			<Title className='my-5 text-2xl'>Overview</Title>
			<TenantDetailsCard tenant={tenant} />
			{tenant.transactions && (<TransactionListCard transactions={tenant.transactions} />)}
		</Container>
	)
}
