import {showNotification, updateNotification} from '@mantine/notifications'

type NotificationInput = {
	id: string,
	color: string,
	loadingTitle?: string,
	updateTitle?: string,
	loadingMessage?: string,
	updateMessage?: string,
	handler?: () => void
}

export const notifyAndRefetch = (data: NotificationInput) => {
	showNotification({
		id: data.id,
		loading: true,
		title: data.loadingTitle ?? 'Saving Changes...',
		message: data.loadingMessage ?? '',
		autoClose: false,
		disallowClose: true,
	})
	setTimeout(() => {
		if (data.handler) data.handler()
		updateNotification({
			id: data.id,
			color: data.color,
			title: data.updateTitle ?? 'Success!',
			message: data.updateMessage ?? '',
			//   icon: <CheckIcon />,
			autoClose: 2000,
		})
	}, 2000)
}
