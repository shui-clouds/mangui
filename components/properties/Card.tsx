import {Group, Text, Divider, Card} from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import {Pig, Home} from 'tabler-icons-react'
import PropertyForm from './Form'

export default function PropertyCard({property}: {property: Exclude<Parameters<typeof PropertyForm>[0]['property'], undefined>}) {
	return (
		<Card className='my-4' withBorder>
			<h1 className='font-medium text-xl'>
				<Link href={`/properties/${property.id}`}>{property.name}</Link>
			</h1>
			<Text className='my-2' color='dimmed'>{property.address}</Text>
			<Divider className='mb-3 mt-2' variant='dashed' size='sm' />
			<Group spacing='xs'>
				<Home color='purple' />
				<Text className='font-semibold' color='purple'>Rooms available: 1/6</Text>
			</Group>
			<Group className='my-3' spacing='xs'>
				<Pig className='text-green-600' />
				<Text className='font-medium text-green-600'>£2500 / month</Text>
			</Group>
		</Card>
	)
}
