import { BankTypes, BankTypesClasses } from '../../types';
import { bankTypes } from '../lib/const';
import BankMovement from './bankMovement';
import Client from './client';
import Log from './log';

export default class BankAccount {
	client: Client;
	bankType: BankTypesClasses;
	bankMovementHistory: BankMovement[];
	password: number;

	constructor(client: Client, bankType: BankTypes) {
		this.client = client;
		this.bankMovementHistory = [];
		this.bankType = bankTypes[bankType];
		this.password = 1000 + Math.round(Math.random() * 8999);
		Log.getInstance().createLog(`Conta de Banco Criada Para o Cliente "${client.name}"`);
	}

	doDeposit(description: string, amount: number) {
		this.bankMovementHistory.push(new BankMovement(description, amount));
		Log.getInstance().createLog(`Deposito de R$:${amount} na Conta do Cliente "${this.client.name}"`);
	}

	withdraw(description: string, amount: number, password: number) {
		if (this.password === password) {
			this.bankMovementHistory.push(new BankMovement(description, -amount));
			Log.getInstance().createLog(`Saque de R$:${amount} na Conta do Cliente "${this.client.name}"`);
		} else
			Log.getInstance().createLog(
				`Saque de R$:${amount} na Conta do Cliente "${this.client.name}" Deu Falha por: Senha Incorreta`
			);
	}

	getBalance() {
		return this.bankMovementHistory.reduce((prev, data) => prev + data.amount, 0);
	}

	getPayment() {
		const balance = this.getBalance();

		return this.bankType.calculatePayment(this.bankMovementHistory, balance);
	}
}
