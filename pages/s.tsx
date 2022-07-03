import type React from 'react'
import {InferGetServerSidePropsType} from 'next'
import {prisma} from '@/backend/utils/prisma'
import InfoCard from '@/components/tenants/Info'

export default function Home({currentTenantsData}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.dir(currentTenantsData)
	return (
		<>
			{currentTenantsData.length && currentTenantsData.map((tenant) => (
				<InfoCard key={tenant.id} tenant={tenant} />
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
