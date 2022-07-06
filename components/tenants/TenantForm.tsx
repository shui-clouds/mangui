import React from 'react'

import {Button, TextInput, Box, Group, Alert} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferMutationInput} from '@/pages/api/trpc/[trpc]'

type CreateMutationInput = InferMutationInput<'create-tenant'>

export default function TenantForm({tenantId, onConfirmHandler}: {tenantId?: string, onConfirmHandler: () => void}) {
	const createTenantMutation = trpc.useMutation('create-tenant')
	const updateTenantMutation = trpc.useMutation('update-tenant')

	const tenantForm = useForm({
		initialValues: {
			name: '',
			email: '',
			balance: 0,
			createdAt: '',
		},
	})

	return (
		<>
			<form
				style={{marginBottom: 10}}
				onSubmit={tenantForm.onSubmit((values) => {
					if (tenantId) {
						updateTenantMutation.mutate({
							...values,
							email: values.email ?? '',
							id: tenantId,
						})
					} else {
						createTenantMutation.mutate({
							...values,
							email: values.email ?? '',
							createdAt: new Date().toISOString(),
						})
					}
					onConfirmHandler()
				})}
			>
				<TextInput required style={{marginBottom: 10}} label='Full Name' placeholder='Appears on contract' {...tenantForm.getInputProps('name')} />
				<TextInput style={{marginBottom: 10}} label='Email' placeholder='Optional' {...tenantForm.getInputProps('email')} />
				<Group position='right' mt='md'>
					<Button variant='light' type='submit'>{tenantId ? 'Save' : 'Register'}</Button>
				</Group>
			</form>
			{/* {createTenantMutation.error && (
				<Alert style={{marginTop: 10}} title='Please try again!' color='red'>
					Something went wrong: {createTenantMutation.error.message}
				</Alert>
			)}
			{createTenantMutation.data && (
				<Alert title='Success!' color='green'>
					{createTenantMutation.data.tenant.name} has been added.
				</Alert>
			)} */}
		</>
	)
}
