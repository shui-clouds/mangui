import {Group, Text, Divider, Container} from '@mantine/core'
import React from 'react'
import {Pig, DoorEnter, Home} from 'tabler-icons-react'
import PropertyForm from './Form'

export default function PropertyCard({property}: {property: Exclude<Parameters<typeof PropertyForm>[0]['property'], undefined>}) {
	return (
		<>
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
		</>
	)
}
