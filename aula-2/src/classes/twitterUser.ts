import { Notification, Observer, Subject } from '../../types';

export default class TwitterUser implements Subject {
	name: string;
	followers: (Observer | Subject)[];
	notifications: Notification[];
	messages: string[];

	constructor(name: string) {
		this.name = name;
		this.followers = [];
		this.notifications = [];
		this.messages = [];
	}

	registerObserver(user: Observer | Subject) {
		this.followers.push(user);
	}

	removeObserver(user: Observer | Subject) {
		this.followers = this.followers.filter((follower) => follower !== user);
	}

	sendMessage(message: string) {
		this.messages.push(message);
		this.notifyObservers();
	}

	notifyObservers() {
		this.followers.forEach((follower) => {
			follower.update({ author: this, message: this.messages[this.messages.length - 1] });
		});
	}

	update(notification: Notification) {
		this.notifications.push(notification);
	}
}
