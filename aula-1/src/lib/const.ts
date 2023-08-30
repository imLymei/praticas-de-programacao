import EconomicAccount from '../classes/bankTypes/economica';
import SimpleAccount from '../classes/bankTypes/simples';
import TotalAccount from '../classes/bankTypes/total';

export const bankTypes = {
	total: new TotalAccount(),
	simples: new SimpleAccount(),
	economica: new EconomicAccount(),
};
