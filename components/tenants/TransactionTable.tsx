import {TextInput, Paper, Table, Button} from '@mantine/core'
import React from 'react'
import {InferQueryResponse} from '../../pages/api/trpc/[trpc]'

type Transactions = InferQueryResponse<'get-transactions'>

export default function TransactionTable({transactions}: {transactions: Transactions}) {
	const colNames = ['Amount', 'Reference', 'Date']

	const rows = transactions.map((transaction) => (
		<tr className='bg-white border-b ' key={transaction.id}>
			<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
				{transaction.amount}
			</td>
			<td className='px-6 py-4'>
				{transaction.reference}
			</td>
			<td className='px-6 py-4'>
				{transaction.date}
			</td>
			<td className='px-10 py-4'>
				<a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
			</td>
		</tr>
	))

	return (
		<div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
			<table className='w-full text-sm text-left text-gray-500'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
					<tr>
						{colNames.map((name: string) => (
							<th scope='col' className='px-6 py-3' key={name}>
								{name}
							</th>
						))}
						<th scope='col' className='px-6 py-3'>
							<span className='sr-only'>Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}
