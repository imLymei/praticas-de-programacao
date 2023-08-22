import { BankAccountType } from '../../../types';
import BankMovement from '../bankMovement';

export default class SimpleAccount implements BankAccountType {
	get bankType() {
		return 'Simples';
	}

	calculatePayment(bankMovementHistory: BankMovement[], balance: number) {
		const movementCost = bankMovementHistory.length <= 5 ? 0 : bankMovementHistory.length - 5;

		const percentage = balance <= 100 ? 0 : balance >= 1500 ? 1 : (balance - 100) / 1400;

		return (movementCost + 20) * (1 - percentage);
	}
}
