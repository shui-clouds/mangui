import React, {useState} from 'react'

import {Modal, Button, Group, TextInput, Box, Alert} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferMutationInput} from '@/pages/api/trpc/[trpc]'

type CreateMutationInput = InferMutationInput<'create-tenant'>

export default function DetailsModal({title, submitButtonName}: {title: string, submitButtonName: string}) {
	const [opened, setOpened] = useState(false)
	const createTenantMutation = trpc.useMutation('create-tenant')

	const CreateTenant = async (values: CreateMutationInput) => createTenantMutation.mutate({
		...values,
		email: values.email ?? '',
	})

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			balance: 0,
			createdAt: new Date().toISOString(),
		},
	})

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title={title}
				size='md'
				withCloseButton
			>
				<Box>
					<form
						style={{marginBottom: 10}}
						onSubmit={form.onSubmit((values) => CreateTenant(values))}
					>
						<TextInput required style={{marginBottom: 10}} label='Full Name' placeholder='Appears on contract' {...form.getInputProps('name')} />
						<TextInput style={{marginBottom: 10}} label='Email' placeholder='Optional' {...form.getInputProps('email')} />
						<Group position='right' mt='md'>
							<Button type='submit' disabled={createTenantMutation.isLoading}>{submitButtonName}</Button>
						</Group>
					</form>
				</Box>
			</Modal>
			{createTenantMutation.error && (
				<Alert style={{marginBottom: 10}} title='Uh oh!' color='red'>
					Something went wrong... {createTenantMutation.error.message}
				</Alert>
			)}
			{createTenantMutation.isSuccess && (
				<Alert title='Success!' color='green'>
					Tenant has been created.
				</Alert>
			)}
			<Group className='my-2'>
				<Button onClick={() => setOpened(true)}>Add Tenant</Button>
			</Group>
		</>
	)
}
