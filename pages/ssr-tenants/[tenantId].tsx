import type React from 'react'
import {Container, Title} from '@mantine/core'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TransactionListCard from '@/components/transactions/ListCard'
import {getTenant} from '@/lib/db'

export default function TenantPage({tenant}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Container size='md'>
			<Title className='my-5 text-2xl'>Overview</Title>
			<TenantDetailsCard tenant={tenant} />
			{tenant.transactions && (<TransactionListCard transactions={tenant.transactions} />)}
		</Container>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {params} = context
	const tenantId = params?.tenantId

	// TODO: Handle error
	if (tenantId === undefined || Array.isArray(tenantId)) {
		throw Error(`Invalid tenant ID: ${tenantId}`)
	}
	const tenant = await getTenant(tenantId)

	return {
		props: {tenant},
	}
}
