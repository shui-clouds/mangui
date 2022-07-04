import React, {useState} from 'react'

import {Button, Modal, TextInput, Box, Alert, Group, LoadingOverlay} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferMutationInput} from '@/pages/api/trpc/[trpc]'

type CreateMutationInput = InferMutationInput<'create-tenant'>

type ModalProps = {
	title: string,
	confirmButtonName: string,
	triggerButtonName: string
}

export default function CreateTenantModal({props}: {props: ModalProps}) {
	const [opened, setOpened] = useState(false)
	const [visible, setVisible] = useState(false)
	const createTenantMutation = trpc.useMutation('create-tenant')

	const CreateTenant = async (values: CreateMutationInput) => {
		createTenantMutation.mutate({
			...values,
			email: values.email ?? '',
			createdAt: new Date().toISOString(),
		})
	}

	const mantineForm = useForm({
		initialValues: {
			name: '',
			email: '',
			balance: 0,
			createdAt: '',
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
				{createTenantMutation.isLoading && (<LoadingOverlay visible={visible} />)}
				<form
					style={{marginBottom: 10}}
					onSubmit={mantineForm.onSubmit((values) => {
						CreateTenant(values)
						if (!createTenantMutation.isLoading) setOpened(false)
					})}
				>
					<TextInput required style={{marginBottom: 10}} label='Full Name' placeholder='Appears on contract' {...mantineForm.getInputProps('name')} />
					<TextInput style={{marginBottom: 10}} label='Email' placeholder='Optional' {...mantineForm.getInputProps('email')} />
					<Group position='right' mt='md'>
						<Button variant='light' type='submit' disabled={createTenantMutation.isLoading}>{props.confirmButtonName}</Button>
					</Group>
				</form>
			</Modal>
			{createTenantMutation.error && (
				<Alert style={{marginTop: 10}} title='Please try again!' color='red'>
					Something went wrong: {createTenantMutation.error.message}
				</Alert>
			)}
			{createTenantMutation.isSuccess && (
				<Alert title='Success!' color='green'>
					{createTenantMutation.data.tenant.name} has been added.
				</Alert>
			)}
			<Group className='my-2'>
				<Button radius='md' size='md' color='green' variant='light' onClick={() => setOpened(true)}>{props.triggerButtonName}</Button>
			</Group>
		</>
	)
}
