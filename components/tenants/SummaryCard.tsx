import {Group, Button, Badge, Card, Text, Title, Divider, Stack, ActionIcon, Container} from '@mantine/core'
import React from 'react'
import {Edit, BuildingBank, DoorExit, User, DoorEnter, Home, Plus, Pencil} from 'tabler-icons-react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Tenant = InferQueryResponse<'get-tenants'>[number]

export default function SummaryCard({tenant, handler}: {tenant: Tenant, handler: () => void}) {
	return (
		<Card style={{marginBottom: 10}} withBorder radius='md' p='md'>
			<Container>
				<Group position='apart' style={{marginTop: 5}}>
					<Group position='left' spacing='xs'>
						<Title order={4}>{tenant.name}</Title>
						<User size={20} />
					</Group>

					<Group position='right'>
						<ActionIcon color='orange' variant='transparent' onClick={handler}>
							<Edit color='orange' size={30} />
						</ActionIcon>
					</Group>
				</Group>

				<Text style={{marginBottom: 10}} color='dimmed'>{tenant.email}</Text>
				<Divider variant='dashed' size='sm' my='sm' />

				<Stack my='sm' align='flex-start' justify='space-around'>
					<Group position='left' spacing='xs'>
						<Home color='purple' />
						<Text weight={700} color='purple'>Penhurst</Text>
						<Badge size='md' radius='sm' color='teal' variant='outline'>
							PRESENT
						</Badge>
					</Group>

					<Group position='left' spacing='xs'>
						<BuildingBank color='teal' />
						<Text weight={700} color='teal'>£{tenant.balance}</Text>
					</Group>
					<Group position='left' spacing='xs'>
						<DoorEnter color='orange' />
						<Text weight={600} color='gray'>2nd April 2021</Text>
					</Group>
					<Group position='left' spacing='xs'>
						<DoorExit color='orange' />
						<Text weight={600} color='gray'>12th November 2022</Text>
						<Text weight={400} color='gray'>1 month, 2 days remaining</Text>
					</Group>
				</Stack>

				<Group style={{marginTop: 20}} position='left' spacing='sm'>
					<Button size='sm' radius='md' variant='light' color='orange' leftIcon={<Pencil size={20} />}>
						Update Tenancy
					</Button>
					<Button size='sm' radius='md' variant='light' color='teal' leftIcon={<Plus size={20} />}>
						Balance
					</Button>
				</Group>
			</Container>
		</Card>
	)
}
