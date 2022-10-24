import {Text, Card, Image, Group, Badge, Button} from '@mantine/core'
import React from 'react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Transactions = InferQueryResponse<'get-transactions'>

export default function TransactionCard({transaction}: {transaction: Transactions[number]}) {
	return (
		<Card className='my-2' p='lg' radius='sm' withBorder>
			<Group position='apart' mt='xs' mb='xs'>
				<Text weight={500}>{transaction.date}</Text>
				<Badge color='gray' variant='light'>
					{transaction.id}
				</Badge>
			</Group>
			<Text size='md' color='black'>
				Amount
			</Text>
			<Text size='lg' className={`${transaction.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
				{transaction.amount}
			</Text>

			<Text size='md' color='black'>
				Reference
			</Text>
			<Text size='lg'>
				{transaction.reference}
			</Text>
			{/* <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
				WIN
			</Button> */}
		</Card>
	)
}
