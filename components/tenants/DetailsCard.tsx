import {Group, Button, Badge, Card, Text, Title, Divider, Stack, ActionIcon, Container} from '@mantine/core'
import {useModals} from '@mantine/modals'
import React from 'react'
import {Edit, BuildingBank, DoorExit, User, DoorEnter, Home, Plus, Pencil} from 'tabler-icons-react'
import TenantForm from './TenantForm'

export default function TenantDetailsCard({tenant}: {tenant: Exclude<Parameters<typeof TenantForm>[0]['tenant'], undefined>}) {
	const modals = useModals()

	const openTenantEditModal = () => {
		const id = modals.openModal({
			title: tenant.name,
			children: <TenantForm
				tenant={tenant}
				close={() => modals.closeModal(id)}
			/>,
		})
	}

	return (
		<Card className='mb-5 p-2' withBorder>
			<Group className=' ml-4 mt-2'>
				<Title className='text-lg'>{tenant.name}</Title>
				<ActionIcon variant='transparent' onClick={openTenantEditModal}>
					<Edit color='orange' />
				</ActionIcon>
			</Group>

			<Container className='space-y-3'>
				<Text color='dimmed'>{tenant.email}</Text>
				<Divider className='my-3' variant='dashed' size='sm' />
				<Group spacing='xs'>
					<Home color='purple' />
					<Text className='font-semibold' color='purple'>Penhurst</Text>
					<Badge className='rounded-md' size='md' variant='outline'>
						PRESENT
					</Badge>
				</Group>
				<Group spacing='xs'>
					<BuildingBank color='teal' />
					<Text className='font-medium' color='teal'>£{tenant.balance}</Text>
				</Group>
				<Group spacing='xs'>
					<DoorEnter color='orange' />
					<Text className='font-medium' color='gray'>2nd April 2021</Text>
				</Group>
				<Group spacing='xs'>
					<DoorExit color='orange' />
					<Text className='font-medium' color='gray'>12th November 2022</Text>
					<Text className='font-medium' color='gray'>1 month, 2 days remaining</Text>
				</Group>

				<div className='flex justify-start space-x-3 py-2'>
					<Button className='rounded-lg' size='sm' variant='light' color='orange' leftIcon={<Pencil />}>
						Update Tenancy
					</Button>
					<Button className='rounded-lg' size='sm' variant='light' color='teal' leftIcon={<Plus />}>
						Balance
					</Button>
				</div>
			</Container>
		</Card>
	)
}
