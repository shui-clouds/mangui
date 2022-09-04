import React from 'react'

import {Button, TextInput, Group, NumberInput} from '@mantine/core'

import {useForm} from '@mantine/form'
import {showNotification} from '@mantine/notifications'
import {useRouter} from 'next/router'
import {DatePicker} from '@mantine/dates'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from '@/pages/api/trpc/[trpc]'

type Tenant = InferQueryResponse<'get-tenant'>

export default function TransactionForm({close, tenant}: {close: () => void, tenant: Tenant}) {
	const {invalidateQueries} = trpc.useContext()
	const router = useRouter()
	const reloadPage = () => {
		router.replace(router.asPath)
	}

	const transactionForm = useForm({
		initialValues: {
			amount: 0,
			reference: '',
			date: new Date().toISOString(),
			tenantId: tenant.id,
		},
	})

	// TODO: fix empty email field failing unique field validation
	const createTransactionMutation = trpc.useMutation('create-transaction', {
		onSuccess(input) {
			invalidateQueries(['get-transactions', tenant.id])
			reloadPage()
			showNotification({color: 'success', message: 'Transaction has been added.'})
			close()
		},
		onError(input) {
			showNotification({color: 'error', message: `${input.message}`})
		},
	})

	return (
		<form
			onSubmit={transactionForm.onSubmit((values) => {
				createTransactionMutation.mutate({
					...values,
				})
			})}
		>
			<NumberInput defaultValue={0} label='Amount' {...transactionForm.getInputProps('amount')} />
			<TextInput label='Reference' placeholder='Optional' {...transactionForm.getInputProps('reference')} />
			<DatePicker
				placeholder='Pick date'
				label='Date'
				inputFormat='MM/DD/YYYY'
				defaultValue={new Date()}
				{...transactionForm.getInputProps('date')}

			/>
			<Group position='right' mt='md'>
				<Button variant='light' disabled={createTransactionMutation.isLoading} type='submit'>Add</Button>
			</Group>
		</form>
	)
}
