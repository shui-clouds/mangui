import type React from 'react'
import {Container, Title, Button} from '@mantine/core'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import Link from 'next/link'
import {useModals} from '@mantine/modals'
import PropertyCard from '@/components/properties/Card'
import {getProperty} from '@/lib/db'
import PropertyForm from '@/components/properties/Form'
import RoomForm from '@/components/rooms/Form'

export default function PropertyPage({property}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const modals = useModals()

	const openPropertyEditModal = () => {
		const id = modals.openModal({
			title: property.name,
			children: <PropertyForm
				property={property}
				close={() => modals.closeModal(id)}
			/>,
		})
	}

	const openCreateRoomModal = () => {
		const id = modals.openModal({
			title: 'Add Room',
			children: <RoomForm
				property={property}
				close={() => modals.closeModal(id)}
			/>,
		})
	}

	return (
		<Container size='md' className='mb-10'>
			<Title className='my-5 text-2xl'>{property.name}</Title>
			<Link href='/properties'>Back</Link>
			<Title className='my-2 font-medium text-xl'>Overview</Title>
			<PropertyCard key={property.id} property={property} />
			<Button className='rounded-md' size='sm' variant='light' onClick={openPropertyEditModal}>
				Edit Details
			</Button>
			{/* <Group position='apart' className='my-5'>
				<Text className='my-2 text-xl font-medium'>Account Balance: £{balance}</Text>
				<Button className='rounded-md' size='sm' variant='light' onClick={openTransactionCreateModal}>
				Add Transaction
				</Button>
			</Group> */}
			<Title className='mt-5 mb-2 font-medium text-xl'>Rooms</Title>
			<Button className='rounded-md' size='sm' variant='light' onClick={openCreateRoomModal}>
				Add Room
			</Button>
			<Title className='mt-5 mb-2 font-medium text-xl'>Transaction History</Title>
			{/* {property.transactions.map((t) => (<TransactionCard transaction={t} />))} */}
		</Container>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {params} = context
	const propertyId = params?.propertyId

	// TODO: Handle error
	if (propertyId === undefined || Array.isArray(propertyId)) {
		throw Error(`Invalid property ID: ${propertyId}`)
	}
	const property = await getProperty(propertyId)

	return {
		props: {property},
	}
}
