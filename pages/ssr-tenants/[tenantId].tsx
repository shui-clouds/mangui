import type React from 'react'
import { Card, Container, Title, Button, Text, Group, Divider } from '@mantine/core'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useModals } from '@mantine/modals'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TransactionCard from '@/components/transactions/Card'
import { getTenant } from '@/lib/db'
import TenantForm from '@/components/tenants/TenantForm'
import TransactionForm from '@/components/transactions/Form'

// TODO: Auto charge rent
export default function TenantPage({ tenant }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
		<Container size='md'>
			<Group position='apart' spacing='sm'>
				<Title className='my-4 text-2xl'>Overview</Title>
				<Button className='rounded-lg' size='sm' variant='light' onClick={openTenantEditModal}>
					Edit Details
				</Button>
			</Group>
			<TenantDetailsCard key={tenant.id} tenant={tenant} />
			<Divider className='mt-8 mb-4' />
			<Group position='apart' spacing='sm'>
				<Text className='my-4 text-xl font-medium'>Account Balance: £{balance}</Text>
				<Button className='rounded-md' size='sm' variant='light' onClick={openTransactionCreateModal}>
					Add Transaction
				</Button>
			</Group>
			<Title className='my-2 font-medium text-xl'>Transaction History</Title>
			{tenant.transactions.map((t) => (<TransactionCard transaction={t} />))}
			<div className='my-8'>
				<Link href='/ssr-tenants'>Back</Link>
			</div>
		</Container >
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { params } = context
	const tenantId = params?.tenantId

	// TODO: Handle error
	if (tenantId === undefined || Array.isArray(tenantId)) {
		throw Error(`Invalid tenant ID: ${tenantId}`)
	}
	const tenant = await getTenant(tenantId)

	return {
		props: { tenant },
	}
}
