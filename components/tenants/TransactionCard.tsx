import {Table, Container, Card, Badge, Title, Divider, Group, ActionIcon} from '@mantine/core'
import React from 'react'
import {Cash, Pencil, Plus} from 'tabler-icons-react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Transactions = InferQueryResponse<'get-transactions'>
type Transaction = InferQueryResponse<'get-transaction'>

export default function TransactionCard({transactions, handler}: {transactions: Transactions, handler: (transaction?: Transaction) => void}) {
	const transactionsTotalAmount: number = transactions.map((t) => t.amount).reduce((prev, next) => prev + next)

	const rows = transactions.map((t: Transaction) => (
		<tr key={t.id}>
			<td>{t.amount}</td>
			<td><Badge color='grape'>Rent</Badge></td>
			<td>{t.reference}</td>
			<td>{t.date}</td>
			<td>
				<ActionIcon variant='transparent'>
					<Pencil
						onClick={() => {
							handler(t)
						}}
						color='gray'
					/>
				</ActionIcon>
			</td>
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
					<ActionIcon variant='transparent'>
						<Plus color='teal' onClick={() => { handler() }} size={30} />
					</ActionIcon>
				</Group>
				<Divider variant='dashed' size='sm' my='sm' />
				<Table verticalSpacing='sm' horizontalSpacing='sm' fontSize='md'>
					<thead>
						<tr>
							<th>Amount</th>
							<th>Category</th>
							<th>Reference</th>
							<th>Date</th>
							<th> </th>
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
