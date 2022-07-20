import {Table, Container, Card, Badge, Title, Divider, Group} from '@mantine/core'
import React from 'react'
import {Cash} from 'tabler-icons-react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Transactions = InferQueryResponse<'get-transactions'>

export default function TransactionListCard({transactions}: {transactions: Transactions}) {
	const transactionsTotalAmount: number = transactions.map((t) => t.amount).reduce((prev, next) => prev + next)

	const rows = transactions.map((t) => (
		<tr key={t.id}>
			<td>{t.amount}</td>
			<td><Badge color='grape'>Rent</Badge></td>
			<td>{t.reference}</td>
			<td>{t.date}</td>
		</tr>
	))

	return (
		<Card className='p-5' withBorder>
			<div className='flex justify-start space-x-2'>
				<Cash color='teal' />
				<Title className='text-lg'>Transactions</Title>
			</div>
			<Divider className='my-3' variant='dashed' size='sm' />
			<Table verticalSpacing='sm' horizontalSpacing='sm' fontSize='md'>
				<thead>
					<tr>
						<th>Amount</th>
						<th>Category</th>
						<th>Reference</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			<Divider className='my-3' variant='dotted' size='md' />
			<Title className='mt-5 text-lg'>Total £{transactionsTotalAmount}</Title>
		</Card>
	)
}
