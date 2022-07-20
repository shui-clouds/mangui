import {showNotification} from '@mantine/notifications'

export const showSuccessNotification = () => showNotification(
	{
		title: 'Done!',
		message: 'Changes have been saved.',
		color: 'success',
	},
)

export const showErrorNotification = () => showNotification(
	{
		title: 'Try again!',
		message: 'Your changes could not be saved.',
		color: 'error',
	},
)
