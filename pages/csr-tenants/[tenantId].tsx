import type React from 'react'
import {useRouter} from 'next/router'
import Error from 'next/error'
import {Button, Card, Container, Group, Title, Text, Divider} from '@mantine/core'
import Link from 'next/link'
import {useModals} from '@mantine/modals'
import {trpc} from '@/utils/trpc'
import TenantDetailsCard from '@/components/tenants/DetailsCard'
import TenantForm from '@/components/tenants/TenantForm'
import TransactionCard from '@/components/transactions/Card'
import TransactionForm from '@/components/transactions/Form'

export default function TenantPage() {
	const router = useRouter()
	const modals = useModals()
	const {tenantId} = router.query
	const {data: tenant, refetch, isLoading} = trpc.useQuery(
		['get-tenant', tenantId as string],
		{
			refetchInterval: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	)

	const openTenantEditModal = () => {
		const id = modals.openModal({
			title: tenant?.name,
			children: <TenantForm
				tenant={tenant}
				close={() => modals.closeModal(id)}
			/>,
		})
	}
	const sum = (arr: number[]) => (arr.reduce((a, b) => a + b, 0))

	if (isLoading) { return 'LOADING WAAAAAAA' }
	if (!tenant) { return <Error statusCode={404} /> }

	const openTransactionCreateModal = () => {
		const id = modals.openModal({
			title: 'New Transaction',
			children: <TransactionForm
				tenant={tenant}
				close={() => {
					// TODO: Should fetch on success
					refetch()
					modals.closeModal(id)
				}}
			/>,
		})
	}

	const balance = sum(tenant.transactions.map((t) => t.amount))
	tenant.transactions.sort((a, b) => new Date(b.date) - new Date(a.date))

	return (
		<Container size='md' className='mb-10'>
			<Group position='apart' spacing='sm'>
				<Title className='my-5 text-2xl'>Overview</Title>
				<Button className='rounded-lg' size='sm' variant='light' onClick={openTenantEditModal}>
					Edit Details
				</Button>
			</Group>
			<TenantDetailsCard key={tenant.id} tenant={tenant} />
			<Divider className='mt-8 mb-4' variant='dashed' />
			<Group position='apart' spacing='sm'>
				<Text className='my-4 text-xl font-medium'>Account Balance: £{balance}</Text>
				<Button className='rounded-md' size='sm' variant='light' onClick={openTransactionCreateModal}>
					Add Transaction
				</Button>
			</Group>
			<Title className='my-2 font-medium text-xl'>Transaction History</Title>
			{tenant.transactions.map((t) => (<TransactionCard transaction={t} />))}
			<div className='my-8'>
				<Link href='/csr-tenants'>Back</Link>
			</div>
		</Container >
	)
}
