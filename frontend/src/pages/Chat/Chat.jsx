import React, { useRef, useState } from 'react'
import ChatBox from '../../components/ChatBox/ChatBox'
import Conversation from '../../components/Coversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import NavIcons from '../../components/NavIcons/NavIcons'
import './Chat.css'
import { useEffect } from 'react'
import { userChats } from '../../api/ChatRequests'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import AddChatModal from '../../components/AddChatModal/AddChatModal'

const Chat = () => {
	const dispatch = useDispatch()
	const socket = useRef()
	const { user } = useSelector((state) => state.authReducer.authData)
	const [modalOpened, setModalOpened] = useState(false)
	const [chats, setChats] = useState([])
	const [onlineUsers, setOnlineUsers] = useState([])
	const [currentChat, setCurrentChat] = useState(null)
	const [sendMessage, setSendMessage] = useState(null)
	const [receivedMessage, setReceivedMessage] = useState(null)
	const [selectedUsers, setSelectedUsers] = useState([])
	// Get the chat in chat section
	useEffect(() => {
		const getChats = async () => {
			try {
				const { data } = await userChats(user._id)
				setChats(data)
			} catch (error) {
				console.log(error)
			}
		}
		getChats()
	}, [user._id])

	// Connect to Socket.io
	useEffect(() => {
		socket.current = io('https://zensocialmediasocket.herokuapp.com/')
		socket.current.emit('new-user-add', user._id)
		socket.current.on('get-users', (users) => {
			setOnlineUsers(users)
		})
	}, [user])

	// Send Message to socket server
	useEffect(() => {
		if (sendMessage !== null) {
			socket.current.emit('send-message', sendMessage)
		}
	}, [sendMessage])

	// Get the message from socket server
	useEffect(() => {
		socket.current.on('receive-message', (data) => {
			setReceivedMessage(data)
		})
	}, [])

	const checkOnlineStatus = (chat) => {
		const chatMember = chat.members.find((member) => member !== user._id)
		const online = onlineUsers.find((user) => user.userId === chatMember)
		return online ? true : false
	}

	return (
		<div className="Chat">
			{/* Left Side */}
			<div className="Left-side-chat">
				<LogoSearch />
				<div className="Chat-container">
					<h2>Chats</h2>
					<div className="Chat-list">
						{chats.map((chat) => (
							<div
								onClick={() => {
									setCurrentChat(chat)
								}}
							>
								<Conversation
									data={chat}
									currentUser={user._id}
									online={checkOnlineStatus(chat)}
								/>
							</div>
						))}
					</div>
					<div
						style={{
							height: '2rem',
							bottom: '0.5rem',
						}}
						className="send-button button"
						onClick={() => {
							setModalOpened(true)
						}}
					>
						Add Chat
					</div>
					<AddChatModal
						modalOpened={modalOpened}
						setModalOpened={setModalOpened}
						chats={chats}
						setChats={setChats}
						user={user}
						selectedUsers={selectedUsers}
						setSelectedUsers={setSelectedUsers}
					/>
				</div>
			</div>

			{/* Right Side */}

			<div className="Right-side-chat">
				<div style={{ width: '20rem', alignSelf: 'flex-end' }}>
					<NavIcons />
				</div>
				<ChatBox
					chat={currentChat}
					currentUser={user._id}
					setSendMessage={setSendMessage}
					receivedMessage={receivedMessage}
				/>
			</div>
		</div>
	)
}

export default Chat
