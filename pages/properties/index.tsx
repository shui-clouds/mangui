import type React from 'react'
import {useModals} from '@mantine/modals'
import {Button, Card, Container, Title} from '@mantine/core'
import {InferGetServerSidePropsType} from 'next'
import Link from 'next/link'
import PropertyForm from '@/components/properties/Form'
import PropertyCard from '@/components/properties/Card'
import {getProperties} from '@/lib/db'

export default function PropertiesPage({properties}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const modals = useModals()

	const openContentModal = () => {
		const id = modals.openModal({
			title: 'New Property',
			children: <PropertyForm
				close={() => { modals.closeModal(id) }}
			/>,
		})
	}

	return (
		<Container size='md' className='mb-10'>
			<Title className='my-4 font-medium text-2xl'>Properties</Title>
			<Button variant='light' radius='md' size='sm' onClick={openContentModal}>New Property</Button>
			{properties.map((property) => (
				<Card key={property.id} withBorder className='my-4'>
					<h1 className='font-medium text-xl'>
						<Link href={`/properties/${property.id}`}>{property.name}</Link>
					</h1>
					<PropertyCard key={property.id} property={property} />
				</Card>
			))}
		</Container>
	)
}

export async function getServerSideProps() {
	const properties = await getProperties()
	return {
		props: {properties},
	}
}
