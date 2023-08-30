import { BankTypes, BankTypesClasses } from '../../types';
import { bankTypes } from '../lib/const';
import BankMovement from './bankMovement';
import Client from './client';

export default class BankAccount {
	client: Client;
	bankType: BankTypesClasses;
	bankMovementHistory: BankMovement[];

	constructor(client: Client, bankType: BankTypes) {
		this.client = client;
		this.bankMovementHistory = [];
		this.bankType = bankTypes[bankType];
	}

	doDeposit(description: string, amount: number) {
		this.bankMovementHistory.push(new BankMovement(description, amount));
	}

	withdraw(description: string, amount: number) {
		this.bankMovementHistory.push(new BankMovement(description, -amount));
	}

	getBalance() {
		return this.bankMovementHistory.reduce((prev, data) => prev + data.amount, 0);
	}

	getPayment() {
		const balance = this.getBalance();

		return this.bankType.calculatePayment(this.bankMovementHistory, balance);
	}
}
