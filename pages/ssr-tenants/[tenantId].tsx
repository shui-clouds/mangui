import type React from 'react'
import {Card, Container, Title, Button, Text, Group} from '@mantine/core'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import Link from 'next/link'
import {useModals} from '@mantine/modals'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TransactionCard from '@/components/transactions/Card'
import {getTenant} from '@/lib/db'
import TenantForm from '@/components/tenants/TenantForm'
import TransactionForm from '@/components/transactions/Form'

// TODO: Auto charge rent
export default function TenantPage({tenant}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

	const openTransactionCreateModal = () => {
		const id = modals.openModal({
			title: 'New Transaction',
			children: <TransactionForm
				tenant={tenant}
				close={() => modals.closeModal(id)}
			/>,
		})
	}
	const sum = (arr: number[]) => (arr.reduce((a, b) => a + b, 0))
	const balance = sum(tenant.transactions.map((t) => t.amount))

	tenant.transactions.sort((a, b) => new Date(b.date) - new Date(a.date))

	return (
		<Container size='md' className='mb-10'>
			<Title className='my-5 text-2xl'>{tenant.name}</Title>
			<Link href='/ssr-tenants'>Back</Link>
			<Title className='my-2 font-medium text-xl'>Overview</Title>
			<Card className='mb-5 p-2' withBorder>
				<TenantDetailsCard key={tenant.id} tenant={tenant} />
				<div className='flex justify-start space-x-3 py-2'>
					<Button className='ml-4 rounded-lg' size='sm' variant='light' onClick={openTenantEditModal}>
						Edit Details
					</Button>
				</div>
			</Card>
			<Group position='apart' className='my-5'>
				<Text className='my-2 text-xl font-medium'>Account Balance: £{balance}</Text>
				<Button className='rounded-md' size='sm' variant='light' onClick={openTransactionCreateModal}>
					Add Transaction
				</Button>
			</Group>
			<Title className='my-2 font-medium text-xl'>Transaction History</Title>
			{tenant.transactions.map((t) => (<TransactionCard transaction={t} />))}
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
