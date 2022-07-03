import {InferGetServerSidePropsType} from 'next'
import type React from 'react'
import {Button} from '@mantine/core'
import {trpc} from '@/utils/trpc'
import {inferQueryResponse} from './api/trpc/[trpc]'
import InfoCard from '@/components/tenants/Info'

export default function Home2() {
	const {
		data: currentTenants,
		refetch,
		isLoading,
	} = trpc.useQuery(['get-tenants'], {
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	})

	if (isLoading) return 'LODING WAAAA'
	console.dir(currentTenants)
	return (
		<div className='container m-10 p-5'>
			<Button className='bg-red-400'>Hello</Button>

			{currentTenants?.length && currentTenants.map((tenant) => (
				<InfoCard tenant={tenant} key={tenant.id} />
			))}

		</div>
	)
}
