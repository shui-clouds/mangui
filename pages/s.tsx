import type React from 'react'
import {InferGetServerSidePropsType} from 'next'
import {prisma} from '@/backend/utils/prisma'
import SummaryCard from '@/components/tenants/SummaryCard'

export default function Home({currentTenantsData}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.dir(currentTenantsData)
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{currentTenantsData.length && currentTenantsData.map((tenant) => (
				<SummaryCard key={tenant.id} tenant={tenant} />
			))}

		</>
	)
}

export async function getServerSideProps() {
	const currentTenantsData = await prisma.tenant.findMany()

	return {
		props: {
			currentTenantsData,
		},
	}
}
