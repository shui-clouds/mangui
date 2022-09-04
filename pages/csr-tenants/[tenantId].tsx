import type React from 'react'
import {useRouter} from 'next/router'
import Error from 'next/error'
import {Button, Card, Container, Group, Title, Text} from '@mantine/core'
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
		<Container size='md'>
			<Title className='my-5 text-2xl'>{tenant.name}</Title>
			<Link href='/csr-tenants'>Back</Link>
			<Title className='my-2 font-medium text-xl'>Overview</Title>
			<Card className='mb-5 p-2' withBorder>
				<TenantDetailsCard tenant={tenant} />
				<div className='flex justify-start space-x-3 py-2'>
					<Button className='ml-4 rounded-lg' size='sm' variant='light' color='orange' onClick={openTenantEditModal}>
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
