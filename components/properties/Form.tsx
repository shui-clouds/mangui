import React from 'react'

import {Button, TextInput, Group} from '@mantine/core'

import {useForm} from '@mantine/form'
import {showNotification} from '@mantine/notifications'
import {useRouter} from 'next/router'
import {trpc} from '@/utils/trpc'
import {InferQueryResponse} from '@/pages/api/trpc/[trpc]'
import {showErrorNotification, showSuccessNotification} from '@/lib/notifications'

type Property = InferQueryResponse<'get-property'>

export default function PropertyForm({close, property}: {close: () => void, property?: Property}) {
	const {invalidateQueries} = trpc.useContext()
	const router = useRouter()
	const reloadPage = () => {
		router.replace(router.asPath)
	}

	const propertyForm = useForm({
		initialValues: {
			name: property ? property.name : '',
			address: property ? property.address : '',
		},
	})

	const updatePropertyMutation = trpc.useMutation('update-property', {
		onSuccess() {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			invalidateQueries(['get-property', property!.id])
			reloadPage()
			showSuccessNotification()
			close()
		},
		onError() {
			showErrorNotification()
		},
	})

	// TODO: fix empty email field failing unique field validation
	const createPropertyMutation = trpc.useMutation('create-property', {
		onSuccess(input) {
			invalidateQueries(['get-property'])
			reloadPage()
			showNotification({color: 'success', message: `${input.property.name} has been added.`})
			close()
		},
		onError(input) {
			showNotification({color: 'error', message: `${input.message}`})
		},
	})

	return (
		<form
			onSubmit={propertyForm.onSubmit((values) => {
				if (property) {
					updatePropertyMutation.mutate({
						...values,
						id: property.id,
					})
				} else {
					createPropertyMutation.mutate({
						...values,
					})
				}
			})}
		>
			<TextInput required label='Property Name' placeholder='Appears on contract' {...propertyForm.getInputProps('name')} />
			<TextInput label='Address' placeholder='Optional' {...propertyForm.getInputProps('address')} />
			<Group position='right' mt='md'>
				<Button variant='light' disabled={updatePropertyMutation.isLoading || createPropertyMutation.isLoading} type='submit'>{property ? 'Save' : 'Add'}</Button>
			</Group>
		</form>
	)
}
