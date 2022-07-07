import React from 'react'

import {Button, TextInput, Group} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferMutationInput} from '@/pages/api/trpc/[trpc]'
import {sendNotification} from '@/lib/component-helper'

type CreateMutationInput = InferMutationInput<'create-tenant'>

export default function TenantForm({tenantId, onSuccessHandler: onConfirmHandler}: {tenantId?: string, onSuccessHandler: (error?: string) => void}) {
	const tenantForm = useForm({
		initialValues: {
			name: '',
			email: '',
			balance: 0,
			createdAt: '',
		},
	})

	const updateTenantMutation = trpc.useMutation('update-tenant', {
		onSuccess(input) {
			onConfirmHandler()
			sendNotification({message: `${input.updateTenant.name} has been updated.`, success: true})
		},
		onError(input) {
			sendNotification({message: `${input.message}`, success: false})
		},
	})

	const createTenantMutation = trpc.useMutation('create-tenant', {
		onSuccess(input) {
			onConfirmHandler()
			sendNotification({message: `${input.tenant.name} has been added.`, success: true})
		},
		onError(input) {
			sendNotification({message: `${input.message}`, success: false})
		},
	})

	return (
		<form
			style={{marginBottom: 10}}
			onSubmit={tenantForm.onSubmit((values: CreateMutationInput) => {
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
			})}
		>
			<TextInput required style={{marginBottom: 10}} label='Full Name' placeholder='Appears on contract' {...tenantForm.getInputProps('name')} />
			<TextInput style={{marginBottom: 10}} label='Email' placeholder='Optional' {...tenantForm.getInputProps('email')} />
			<Group position='right' mt='md'>
				<Button variant='light' disabled={updateTenantMutation.isLoading} type='submit'>{tenantId ? 'Save' : 'Register'}</Button>
			</Group>
		</form>
	)
}
