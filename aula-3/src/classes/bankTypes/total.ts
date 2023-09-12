import { BankAccountType } from '../../../types';
import BankMovement from '../bankMovement';

export default class TotalAccount implements BankAccountType {
	get bankType() {
		return 'Total';
	}

	calculatePayment(_bankMovementHistory: BankMovement[], balance: number) {
		const percentage = balance <= 200 ? 0 : balance >= 2000 ? 1 : (balance - 200) / 1800;

		return 50 * (1 - percentage);
	}
}
