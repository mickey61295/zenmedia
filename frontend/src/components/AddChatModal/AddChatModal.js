import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import AddChat from '../AddChatCard/AddChat'
import { createChat } from '../../api/ChatRequests'

const AddChatModal = ({
	modalOpened,
	setModalOpened,
	selectedUsers,
	setSelectedUsers,
	chats,
	setChats,
	user,
}) => {
	const handleAddChat = async (e) => {
		e.preventDefault()
		const data = {
			senderId: user._id,
			receiverId: selectedUsers[0],
		}
		let x = chats.filter(
			(chat) =>
				chat.members.includes(data.senderId) &&
				chat.members.includes(data.receiverId)
		)
		if (x.length === 0) {
			let result = await createChat(data)
			setSelectedUsers([])
			setChats([...chats, result.data])
		} else {
			console.log('chat already exists')
			setSelectedUsers([])
		}
	}
	const theme = useMantineTheme()
	return (
		<Modal
			overlayColor={
				theme.colorScheme === 'dark'
					? theme.colors.dark[9]
					: theme.colors.gray[2]
			}
			overlayOpacity={0.55}
			overlayBlur={3}
			size="55%"
			opened={modalOpened}
			onClose={() => setModalOpened(false)}
		>
			<AddChat
				chats={chats}
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
			/>
			<div
				style={{
					height: '2rem',
					margin: '1rem',
					width: '8 rem',
				}}
				className="send-button button"
				onClick={(e) => {
					setModalOpened(false)
					handleAddChat(e)
				}}
			>
				Start Chat
			</div>
		</Modal>
	)
}

export default AddChatModal
