import {showNotification} from '@mantine/notifications'

type NotificationInput = {
	message?: string,
	success: boolean,
}

export const sendNotification = (data: NotificationInput) => {
	showNotification({
		id: data.message,
		title: data.success ? 'Done!' : 'Try again!',
		message: data.message ?? (data.success ? 'Changes have been updated.' : 'Your changes could not be saved.'),
		color: data.success ? 'teal' : 'red',
		autoClose: 5000,
		disallowClose: false,
	})
}
