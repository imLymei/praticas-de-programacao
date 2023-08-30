'use client';

import TwitterUser from '@/classes/twitterUser';
import FollowModal from '@/components/FollowModal';
import { classes, classesArray } from '@/utils/const';
import { useState, useRef } from 'react';

export default function Home() {
	const [hardUpdate, setHardUpdate] = useState(0);
	const [users, setUsers] = useState<TwitterUser[]>([new TwitterUser('Lymei')]);
	const [addFollowUserSelected, setAddFollowUserSelected] = useState<number>(-1);
	const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);

	const newUserInputRef = useRef<HTMLInputElement>(null);
	const newUserTypeInputRef = useRef<HTMLSelectElement>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (newUserInputRef.current && newUserTypeInputRef.current && newUserInputRef.current.value !== '') {
			setUsers((prev) => [
				...prev,
				new classes[newUserTypeInputRef.current?.value](newUserInputRef.current!.value),
			]);
		}
	}

	return (
		<main className='h-screen p-4 flex flex-col justify-between'>
			{isFollowModalOpen && (
				<FollowModal
					setIsFollowModalOpen={setIsFollowModalOpen}
					addFollowUserSelected={addFollowUserSelected}
					users={users}
					setUsers={setUsers}
				/>
			)}
			<div className='h-[60vh] p-2 grid grid-cols-2 gap-4 border border-neutral-800 rounded overflow-y-auto'>
				{users.map((user, index) => (
					<div key={index} className='p-2 h-96 border border-neutral-800 rounded'>
						<p className='text-xl text-center font-bold border-b border-neutral-800'>{user.name}</p>
						{user.followers && (
							<>
								<p>Followers: {user.followers.length}</p>
								<div className='h-20 overflow-y-auto'>
									{user.followers.map((follower, followerIndex) => (
										<p key={`follower-${followerIndex}`}>{follower.name}</p>
									))}
								</div>
							</>
						)}
						<p>Notifications: {user.notifications.length}</p>
						<div className='h-20 overflow-y-auto'>
							{user.notifications.map((notification, notificationIndex) => (
								<p key={`follower-${notificationIndex}`}>
									{notification.author.name}: {notification.message}
								</p>
							))}
						</div>
						{user.messages && (
							<>
								<p>Messages: {user.messages.length}</p>
								<button
									className='p-2 border border-neutral-800 rounded hover:bg-neutral-200'
									onClick={() => {
										setIsFollowModalOpen(true);
										setAddFollowUserSelected(index);
									}}>
									follow
								</button>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										//@ts-ignore
										console.log(e.target.message.value);
										setUsers((prev) => {
											let newArray = [...prev];
											//@ts-ignore
											newArray[index].sendMessage(e.target.message.value);

											return newArray;
										});
										setHardUpdate((prev) => prev + 1);
									}}>
									<input id='message' name='message' className='p-2 border border-neutral-800 rounded' />
									<button className='p-2 border border-neutral-800 rounded hover:bg-neutral-200'>
										Enviar Mensagem
									</button>
								</form>
							</>
						)}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className='flex justify-center gap-4'>
				<input ref={newUserInputRef} className='p-2 border border-neutral-800 rounded' />
				<select className='p-2 border border-neutral-800 rounded' ref={newUserTypeInputRef}>
					{classesArray.map((classType, index) => (
						<option
							className='p-2 border border-neutral-800 rounded'
							key={`class-${index}`}
							value={classType}>
							{classType}
						</option>
					))}
				</select>
				<button className='p-2 border border-neutral-800 rounded hover:bg-neutral-200'>Add User</button>
			</form>
		</main>
	);
}
