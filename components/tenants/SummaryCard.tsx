import {Group, Button} from '@mantine/core'
import React from 'react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Tenant = InferQueryResponse<'get-tenants'>[number]

export default function SummaryCard({tenant}: {tenant: Tenant}) {
	return (
		<div className='p-4 mb-4 max-w-sm bg-white rounded-lg shadow-sm'>
			<h5 className='text-2xl m-2 font-semibold text-black'>{tenant.name}</h5>
			<p className='text-2xl m-2 font-semibold text-black'>£{tenant.balance}</p>
			{tenant.email && <p className='text-2xl m-2 font-semibold text-black'>{tenant.email}</p>}
			<div className='flex'>
				<Button radius='md' color='orange' variant='light' onClick={() => console.log('hello')}>Edit Details</Button>
			</div>
		</div>
	)
}
