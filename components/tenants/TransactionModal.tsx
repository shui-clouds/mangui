import React, {useEffect, useState} from 'react'

import {Button, Modal, TextInput, Box, Alert, Group, LoadingOverlay, NumberInput} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferMutationInput} from '@/pages/api/trpc/[trpc]'

type CreateMutationInput = InferMutationInput<'create-transaction'>

type TransactionProps = {
	tenantId: string,
	title: string,
	confirmButtonName: string,
	triggerButtonName: string
}

export default function TransactionModal({props}: {props: TransactionProps}) {
	const [opened, setOpened] = useState(false)
	const [visible, setVisible] = useState(false)
	const createTransactionMutation = trpc.useMutation('create-transaction')

	const mantineForm = useForm({
		initialValues: {
			reference: '',
			amount: 0,
			date: '',
			tenantId: props.tenantId,
		},
	})

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					setOpened(false)
					mantineForm.reset()
				}}
				title={props.title}
				size='md'
				withCloseButton
			>
				{createTransactionMutation.isLoading && (<LoadingOverlay visible={visible} />)}
				<form
					style={{marginBottom: 10}}
					onSubmit={mantineForm.onSubmit((values) => {
						createTransactionMutation.mutate({
							...values,
						})
						if (!createTransactionMutation.isLoading) setOpened(false)
					})}
				>
					<NumberInput
						defaultValue={0}
						hideControls
						style={{marginBottom: 10}}
						label='Amount'
						placeholder='Transaction amount'
						{...mantineForm.getInputProps('amount')}
					/>
					<Group position='right' mt='md'>
						<Button variant='light' type='submit' disabled={createTransactionMutation.isLoading}>{props.confirmButtonName}</Button>
					</Group>
				</form>
			</Modal>
			<Group className='my-2'>
				<Button radius='md' size='md' color='green' variant='light' onClick={() => setOpened(true)}>{props.triggerButtonName}</Button>
			</Group>
		</>
	)
}
