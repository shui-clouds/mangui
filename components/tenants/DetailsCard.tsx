import {Group, Text, Divider, Container} from '@mantine/core'
import React from 'react'
import {BuildingBank, DoorExit, DoorEnter, Home} from 'tabler-icons-react'
import TenantForm from './TenantForm'

export default function TenantDetailsCard({tenant}: {tenant: Exclude<Parameters<typeof TenantForm>[0]['tenant'], undefined>}) {
	return (
		<Container>
			<Text className='my-2' color='dimmed'>{tenant.email}</Text>
			<Divider className='mb-3 mt-2' variant='dashed' size='sm' />
			<Text>Student, University of Brighton</Text>
			<Group className='my-3' spacing='xs'>
				<Home color='purple' />
				<Text className='font-semibold' color='purple'>Penhurst</Text>
			</Group>
			<Group className='my-3' spacing='xs'>
				<BuildingBank color='teal' />
				<Text className='font-medium' color='teal'>Account Balance: £{tenant.balance}</Text>
			</Group>
			<Group className='my-3' spacing='xs'>
				<DoorEnter color='orange' />
				<Text className='font-medium' color='gray'>2nd April 2021</Text>
			</Group>
			<Group className='my-3' spacing='xs'>
				<DoorExit color='orange' />
				<Text className='font-medium' color='gray'>12th November 2022</Text>
			</Group>
		</Container>
	)
}
