import TwitterUser from '@/classes/twitterUser';

interface Subject {
	name: string;
	followers: Observer[];
	notifications: Notification[];
	messages: string[];
	registerObserver: (user: Observer) => void;
	removeObserver: (user: Observer) => void;
	notifyObservers: () => void;
	update: (notification: Notification) => void;
	sendMessage: (message: string) => void;
}

interface Observer {
	name: string;
	notifications: Notification[];
	update: (notification: Notification) => void;
}

interface Notification {
	author: TwitterUser;
	message: string;
}
