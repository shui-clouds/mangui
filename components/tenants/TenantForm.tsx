import React from 'react'

import {Button, TextInput, Group} from '@mantine/core'

import {useForm} from '@mantine/form'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from '@/pages/api/trpc/[trpc]'
import {sendNotification} from '@/lib/component-helper'

type Tenant = InferQueryResponse<'get-tenant'>

export default function TenantForm({tenant, onSuccessHandler}: {tenant?: Tenant, onSuccessHandler: (error?: string) => void}) {
	const tenantForm = useForm({
		initialValues: {
			name: tenant ? tenant.name : '',
			email: tenant ? tenant.email : '',
			balance: 0,
			createdAt: '',
		},
	})

	const updateTenantMutation = trpc.useMutation('update-tenant', {
		onSuccess() {
			onSuccessHandler()
			sendNotification({success: true})
		},
		onError() {
			sendNotification({success: false})
		},
	})

	const createTenantMutation = trpc.useMutation('create-tenant', {
		onSuccess(input) {
			onSuccessHandler()
			sendNotification({message: `${input.tenant.name} has been added.`, success: true})
		},
		onError(input) {
			sendNotification({message: `${input.message}`, success: false})
		},
	})

	return (
		<form
			style={{marginBottom: 10}}
			onSubmit={tenantForm.onSubmit((values) => {
				if (tenant) {
					updateTenantMutation.mutate({
						...values,
						email: values.email ?? '',
						id: tenant.id,
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
				<Button variant='light' disabled={updateTenantMutation.isLoading || createTenantMutation.isLoading} type='submit'>{tenant ? 'Save' : 'Register'}</Button>
			</Group>
		</form>
	)
}
