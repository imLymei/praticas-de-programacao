import TwitterUser from '@/classes/twitterUser';

import { useRef } from 'react';

type FollowModalProps = {
	setIsFollowModalOpen: React.Dispatch<boolean>;
	addFollowUserSelected: number;
	users: TwitterUser[];
	setUsers: React.Dispatch<React.SetStateAction<TwitterUser[]>>;
};

export default function FollowModal({
	setIsFollowModalOpen,
	addFollowUserSelected,
	users,
	setUsers,
}: FollowModalProps) {
	const selectedRef = useRef<HTMLSelectElement>(null);

	function handleAddFollower(index: number) {
		if (selectedRef.current !== null && selectedRef.current.value) {
			setUsers((prev) =>
				prev.map((changeUser, changeIndex) => {
					if (changeIndex !== index) return changeUser;
					const user = changeUser;
					//@ts-ignore
					user.registerObserver(prev[selectedRef.current.value]);
					return user;
				})
			);
			setIsFollowModalOpen(false);
		}
	}

	return (
		<div className='absolute inset-0 flex justify-center items-center bg-black/20'>
			<div className='w-[70vw] h-[70vh] border border-neutral-800 bg-white rounded'>
				<select ref={selectedRef}>
					{users.map(
						(user, index) =>
							index !== addFollowUserSelected &&
							!users[addFollowUserSelected].followers.includes(users[index]) && (
								<option key={`select-${user.name}`} value={index}>
									{user.name}
								</option>
							)
					)}
				</select>
				<button onClick={() => handleAddFollower(addFollowUserSelected)}>Seguir</button>
			</div>
			<button
				onClick={() => setIsFollowModalOpen(false)}
				className='absolute top-4 right-4 w-8 h-8 bg-white border border-neutral-800 rounded'>
				X
			</button>
		</div>
	);
}
