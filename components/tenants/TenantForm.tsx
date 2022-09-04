import React from 'react'

import {Button, TextInput, Group} from '@mantine/core'

import {useForm} from '@mantine/form'
import {showNotification} from '@mantine/notifications'
import {useRouter} from 'next/router'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from '@/pages/api/trpc/[trpc]'
import {showErrorNotification, showSuccessNotification} from '@/lib/notifications'

type Tenant = InferQueryResponse<'get-tenants'>[number]

export default function TenantForm({close, tenant}: {close: () => void, tenant?: Tenant}) {
	const {invalidateQueries} = trpc.useContext()
	const router = useRouter()
	const reloadPage = () => {
		router.replace(router.asPath)
	}

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
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			invalidateQueries(['get-tenant', tenant!.id])
			reloadPage()
			showSuccessNotification()
			close()
		},
		onError() {
			showErrorNotification()
		},
	})

	// TODO: fix empty email field failing unique field validation
	const createTenantMutation = trpc.useMutation('create-tenant', {
		onSuccess(input) {
			invalidateQueries(['get-tenants'])
			reloadPage()
			showNotification({color: 'success', message: `${input.tenant.name} has been added.`})
			close()
		},
		onError(input) {
			showNotification({color: 'error', message: `${input.message}`})
		},
	})

	return (
		<form
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
			<TextInput required label='Full Name' placeholder='Appears on contract' {...tenantForm.getInputProps('name')} />
			<TextInput label='Email' placeholder='Optional' {...tenantForm.getInputProps('email')} />
			<Group position='right' mt='md'>
				<Button variant='light' disabled={updateTenantMutation.isLoading || createTenantMutation.isLoading} type='submit'>{tenant ? 'Save' : 'Register'}</Button>
			</Group>
		</form>
	)
}
