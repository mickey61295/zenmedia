import React, { useEffect, useState } from 'react'
import './AddChat.css'
import AddChatModal from '../AddChatModal/AddChatModal'
import { getAllUser } from '../../api/UserRequests'
import User from '../User/User'
import { useSelector } from 'react-redux'
import ChatUser from '../ChatUser/ChatUser'

const AddChat = ({ selectedUsers, setSelectedUsers }) => {
	const [modalOpened, setModalOpened] = useState(false)
	const [persons, setPersons] = useState([])
	const { user } = useSelector((state) => state.authReducer.authData)

	useEffect(() => {
		const fetchPersons = async () => {
			const { data } = await getAllUser()
			setPersons(data)
		}
		fetchPersons()
	}, [])

	return (
		<div className="FollowersCard">
			<h3>People you follow and People who follow you</h3>

			{persons.map((person, id) => {
				if (
					person._id !== user._id &&
					(user.followers.includes(person._id) ||
						user.following.includes(person._id))
				)
					return (
						<ChatUser
							person={person}
							key={id}
							selectedUsers={selectedUsers}
							setSelectedUsers={setSelectedUsers}
						/>
					)
			})}

			<AddChatModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
		</div>
	)
}

export default AddChat
