import {Table, Container, Card, Badge, Title, Divider, Group} from '@mantine/core'
import React from 'react'
import {Cash} from 'tabler-icons-react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Transactions = InferQueryResponse<'get-transactions'>
type Transaction = InferQueryResponse<'get-transaction'>

export default function TransactionCard({transactions}: {transactions: Transactions}) {
	const transactionsTotalAmount: number = transactions.map((t) => t.amount).reduce((prev, next) => prev + next)

	const rows = transactions.map((t: Transaction) => (
		<tr key={t.id}>
			<td>{t.amount}</td>
			<td><Badge color='grape'>Rent</Badge></td>
			<td>{t.reference}</td>
			<td>{t.date}</td>
		</tr>
	))

	return (
		<Card style={{marginBottom: 10}} withBorder radius='md' p='md'>
			<Container>
				<Group position='apart'>
					<Group position='left' spacing='xs'>
						<Cash color='teal' />
						<Title order={4}>Transactions</Title>
					</Group>
				</Group>
				<Divider variant='dashed' size='sm' my='sm' />
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
				<Divider variant='dotted' size='md' my='sm' />
				<Title order={5} style={{marginLeft: 5, marginTop: 10}}>Total £{transactionsTotalAmount}</Title>
			</Container>
		</Card>
	)
}
