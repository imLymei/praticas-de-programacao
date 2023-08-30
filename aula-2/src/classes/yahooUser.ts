import { Notification, Observer } from '../../types';

export default class YahooUser implements Observer {
	name: string;
	notifications: Notification[];

	constructor(name: string) {
		this.name = name;
		this.notifications = [];
	}

	update(notification: Notification) {
		this.notifications.push(notification);
	}
}
