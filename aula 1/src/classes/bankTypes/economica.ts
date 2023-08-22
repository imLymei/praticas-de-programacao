import { BankAccountType } from '../../../types';
import BankMovement from '../bankMovement';

export default class EconomicAccount implements BankAccountType {
	get bankType() {
		return 'Economica';
	}

	calculatePayment(bankMovementHistory: BankMovement[], balance: number) {
		const movementCost = bankMovementHistory.length * 1.5;

		return movementCost + 10;
	}
}
