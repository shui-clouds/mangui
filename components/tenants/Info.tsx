import React from 'react'
import {inferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Tenant = inferQueryResponse<'get-tenants'>[number]

export default function InfoCard({tenant}: {tenant: Tenant}) {
	return (
		<div className='p-4 mb-4 max-w-sm bg-white rounded-lg shadow-sm'>
			<h5 className='text-2xl m-2 font-semibold text-black'>{tenant.name}</h5>
			<p className='text-2xl m-2 font-semibold text-black'>£{tenant.balance}</p>
			{tenant.email && <p className='text-2xl m-2 font-semibold text-green-600'>£{tenant.email}</p>}
			<div className='flex'>
				<button type='button' className='mt-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center'>
					Edit
				</button>
			</div>
		</div>
	)
}
