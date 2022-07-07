import React from 'react'

import {Button, TextInput, Group, NumberInput} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from '@/pages/api/trpc/[trpc]'
import {sendNotification} from '@/lib/component-helper'

type Transaction = InferQueryResponse<'get-transaction'>

export default function TransactionForm({transaction, tenantId, onSuccessHandler}: {
	transaction?: Transaction, tenantId: string, onSuccessHandler: (error?: string) => void}) {
	const transactionForm = useForm({
		initialValues: {
			amount: transaction ? transaction.amount : 0,
			reference: transaction ? transaction.reference : '',
			date: transaction ? transaction.date : '',
		},
	})

	const updateTransactionMutation = trpc.useMutation('update-transaction', {
		onSuccess() {
			onSuccessHandler()
			sendNotification({message: 'Transaction has been updated.', success: true})
		},
		onError(input) {
			sendNotification({message: `${input.message}`, success: false})
		},
	})

	const createTransactionMutation = trpc.useMutation('create-transaction', {
		onSuccess() {
			onSuccessHandler()
			sendNotification({message: 'Transaction has been added.', success: true})
		},
		onError(input) {
			sendNotification({message: `${input.message}`, success: false})
		},
	})

	return (
		<form
			style={{marginBottom: 10}}
			onSubmit={transactionForm.onSubmit((values) => {
				if (transaction) {
					updateTransactionMutation.mutate({
						...values,
						tenantId: transaction.tenantId,
						reference: values.reference ?? '',
						id: transaction.id,
						date: (transaction ? transaction.date : '') as string,
					})
				} else {
					createTransactionMutation.mutate({
						...values,
						reference: values.reference ?? '',
						date: new Date().toISOString(),
						tenantId,
					})
				}
			})}
		>
			<NumberInput hideControls required style={{marginBottom: 10}} label='Amount' placeholder='Amount in GBP' {...transactionForm.getInputProps('amount')} />
			<TextInput style={{marginBottom: 10}} label='Reference' placeholder='Optional' {...transactionForm.getInputProps('reference')} />
			<Group position='right' mt='md'>
				<Button variant='light' color={transaction ? 'blue' : 'green'} disabled={updateTransactionMutation.isLoading || createTransactionMutation.isLoading} type='submit'>{transaction ? 'Save' : 'Add'}</Button>
			</Group>
		</form>
	)
}
