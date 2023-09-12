import EconomicAccount from './src/classes/bankTypes/economica';
import SimpleAccount from './src/classes/bankTypes/simples';
import TotalAccount from './src/classes/bankTypes/total';

type BankTypes = 'total' | 'simples' | 'economica';

type BankTypesClasses = TotalAccount | SimpleAccount | EconomicAccount;

type BankAccountType = {
	bankType: string;
	calculatePayment: (bankMovementHistory: BankMovement[], balance: number) => number;
};
