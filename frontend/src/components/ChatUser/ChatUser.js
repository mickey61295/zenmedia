import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function ChatUser({ person, selectedUsers, setSelectedUsers }) {
	const [checked, setChecked] = useState(false)
	const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
	const { user } = useSelector((state) => state.authReducer.authData)

	const handleChange = () => {
		setChecked(!checked)
		if (!checked) {
			if (!selectedUsers.includes(person._id)) {
				setSelectedUsers([...selectedUsers, person._id])
			}
		} else {
			setSelectedUsers(selectedUsers.filter((id) => id !== person._id))
		}
	}

	return (
		<div className="follower">
			<div>
				<label style={{ alignSelf: 'center' }}>
					<input type="checkbox" checked={checked} onChange={handleChange} />
				</label>

				<img
					src={
						person.profilePicture
							? publicFolder + person.profilePicture
							: publicFolder + 'defaultProfile.png'
					}
					alt="profile"
					style={{ objectFit: 'cover' }}
					className="followerImage"
				/>
				<div style={{ alignSelf: 'center' }}>
					<span>
						{person.firstname} {person.lastname}
					</span>
				</div>
			</div>
		</div>
	)
}
