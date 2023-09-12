import { useRef, useState, useEffect } from 'react';
import BankAccount from './classes/bankAccount';
import Client from './classes/client';
import { BankTypes } from '../types';
import { bankTypes } from './lib/const';
import Log from './classes/log';

function App() {
	const [log, setLog] = useState<Log>();
	const [logIsOpen, setLogIsOpen] = useState(false);
	const [clients, setClients] = useState<Client[]>([]);
	const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<'deposit' | 'withdraw' | null>(null);
	const [bankEdited, setBankEdited] = useState<BankAccount>();

	const addClientNameInput = useRef<HTMLInputElement>(null);
	const addBankClientInput = useRef<HTMLSelectElement>(null);
	const addBankTypeInput = useRef<HTMLSelectElement>(null);
	const changeBankTypeInput = useRef<HTMLSelectElement>(null);

	const addBankMovementDescriptionInput = useRef<HTMLInputElement>(null);
	const addBankMovementAmountInput = useRef<HTMLInputElement>(null);
	const addBankMovementPasswordInput = useRef<HTMLInputElement>(null);

	const banksTypesNames: ['total', 'simples', 'economica'] = ['total', 'simples', 'economica'];

	function addClient(name: string) {
		if (addClientNameInput.current) {
			setClients((prev) => [...prev, new Client(name)]);

			addClientNameInput.current.value = '';
		}
	}

	function addBank(clientIndex: number, bankType: BankTypes) {
		if (addBankClientInput.current && addBankTypeInput.current) {
			const client = clients[clientIndex];

			if (bankAccounts.filter((data) => data.client === client).length === 0) {
				setBankAccounts((prev) => [...prev, new BankAccount(client, bankType)]);
			}
		}
	}

	function handleBankMovement(type: 'deposit' | 'withdraw', bank: BankAccount) {
		setModalType(type);
		setBankEdited(bank);
		setIsModalOpen(true);
	}

	function changeType(newType: BankTypes, bank: BankAccount) {
		let newBank = bank;

		newBank.bankType = bankTypes[newType];

		const newBanks = bankAccounts.slice(0);

		setBankAccounts(newBanks.map((data) => (data === bank ? newBank : data)));
	}

	function addBankMovement(description: string, amount: number, bank: BankAccount, password?: number) {
		if (addBankMovementAmountInput.current && addBankMovementDescriptionInput.current) {
			let newBank = bank;

			if (modalType === 'deposit') newBank.doDeposit(description, amount);
			else newBank.withdraw(description, amount, password ?? 0);

			let newBanks = bankAccounts.splice(0);

			newBanks.map((data) => {
				if (data === newBank) {
					return newBank;
				}
				return data;
			});

			setBankAccounts(newBanks);
			setIsModalOpen(false);
		}
	}

	function Modal() {
		return (
			<div className='absolute inset-0 flex justify-center items-center bg-black/20'>
				<button onClick={() => setIsModalOpen(false)} className='absolute right-8 top-8'>
					X
				</button>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						if (!addBankMovementAmountInput.current?.value || !addBankMovementDescriptionInput.current?.value)
							return;
						if (modalType === 'withdraw' && !addBankMovementPasswordInput.current?.value) return;
						addBankMovement(
							addBankMovementDescriptionInput.current!.value,
							parseFloat(addBankMovementAmountInput.current!.value),
							bankEdited!,
							parseInt(addBankMovementPasswordInput.current?.value ?? '0')
						);
					}}
					className='p-4 flex flex-col gap-4 justify-evenly items-center bg-black border border-white rounded'>
					<div className='flex flex-col gap-2'>
						<label>Descrição:</label>
						<input
							ref={addBankMovementDescriptionInput}
							className='w-48 p-2 bg-transparent outline-none border border-white'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label>Quantidade:</label>
						<input
							ref={addBankMovementAmountInput}
							type='number'
							className='w-48 p-2 bg-transparent outline-none border border-white'
						/>
					</div>
					{modalType === 'withdraw' && (
						<div className='flex flex-col gap-2'>
							<label>Senha:</label>
							<input
								ref={addBankMovementPasswordInput}
								type='password'
								className='w-48 p-2 bg-transparent outline-none border border-white'
							/>
						</div>
					)}
					<button className='border w-full border-white rounded hover:bg-neutral-800 transition p-2'>
						Concluir
					</button>
				</form>
			</div>
		);
	}

	function LogModal() {
		const changeLogIsOpen = useRef(true);

		return (
			<div
				className='absolute inset-0 bg-black/20'
				onClick={() => setLogIsOpen((prev) => (changeLogIsOpen.current ? false : prev))}>
				<div
					className='p-4 flex flex-col gap-4 h-full w-1/3 text-center bg-black border-r border-neutral-800'
					onMouseEnter={() => (changeLogIsOpen.current = false)}
					onMouseLeave={() => (changeLogIsOpen.current = true)}>
					{log?.logs.map((log, index) => (
						<div key={index} className='p-2 border border-neutral-800 rounded'>
							{log}
						</div>
					))}
				</div>
			</div>
		);
	}

	useEffect(() => {
		setLog(Log.getInstance());
	}, []);

	return (
		<main className='h-screen p-12 bg-black text-white flex flex-col justify-between items-center'>
			<button
				onClick={() => setLogIsOpen(true)}
				className='absolute left-4 top-4 p-4 border border-neutral-800 rounded hover:bg-neutral-800 transition-colors'>
				LOG
			</button>
			{logIsOpen && <LogModal />}
			{isModalOpen && <Modal />}
			<div className='flex justify-center gap-12'>
				<div className='w-[40vw] h-[40vh] overflow-y-auto flex flex-col border border-white rounded'>
					<p className='p-4 bg-white text-black border-b border-white'>Clientes:</p>
					{clients.map((data, index) => (
						<div key={`cliente - ${index}`} className='p-4 odd:bg-neutral-800 odd:border-y border-white py-4'>
							<p>Cliente: {data.name}</p>
						</div>
					))}
				</div>
				<div className='w-[40vw] h-[40vh] overflow-y-auto flex flex-col gap-4 border border-white rounded'>
					<p className='p-4 bg-white text-black border-b border-white'>Bancos:</p>
					{bankAccounts.map((data, index) => (
						<div
							key={`banco - ${index}`}
							className='flex flex-col gap-4   p-4 odd:bg-neutral-900 odd:border-y border-white py-4'>
							<div className='flex flex-col gap-2'>
								<div className='grid grid-cols-2 gap-2'>
									<p>Dono: {data.client.name}</p>
									<p>Tipo: {data.bankType.bankType}</p>
									<p>Quantidade: ${data.getBalance()}</p>
									<p>Mensalidade: ${data.getPayment()}</p>
									<p>Senha: {data.password}</p>
								</div>
								<div>
									<p>Movimentos bancarios:</p>
									<div className='pl-4 border-l-4 p-2 max-h-48 overflow-y-auto border-white'>
										{data.bankMovementHistory.map((moveData, moveIndex) => (
											<div
												key={`movimento bancario - ${index}${moveIndex}`}
												className='p-2 even:border-y border-white'>
												<p>{moveData.description}</p>
												<p>Quantidade: ${moveData.amount}</p>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className='flex justify-evenly gap-2'>
								<button
									onClick={() => handleBankMovement('deposit', data)}
									className='border border-white rounded hover:bg-neutral-800 transition p-2'>
									Fazer deposito
								</button>
								<button
									onClick={() => handleBankMovement('withdraw', data)}
									className='border border-white rounded hover:bg-neutral-800 transition p-2'>
									Fazer Saque
								</button>
								<div className='flex gap-2'>
									<select
										ref={changeBankTypeInput}
										className='p-2 bg-transparent outline-none rounded border border-white'>
										{banksTypesNames.map((data) => (
											<option key={`Mudar banco - ${data}`} value={data} className='bg-black'>
												{data}
											</option>
										))}
									</select>
									<button
										onClick={() => {
											//@ts-ignore
											if (changeBankTypeInput.current) changeType(changeBankTypeInput.current.value, data);
										}}
										className='border border-white rounded hover:bg-neutral-800 transition p-2'>
										Mudar tipo de banco
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex gap-4 border border-white rounded p-4'>
				<div className='flex gap-2'>
					<input
						ref={addClientNameInput}
						name='name'
						className='w-48 p-2 bg-transparent outline-none border border-white'
					/>
					<button
						onClick={() => {
							if (addClientNameInput.current) addClient(addClientNameInput.current.value);
						}}
						className='border border-white rounded hover:bg-neutral-800 transition p-2'>
						Adicionar cliente
					</button>
				</div>
				<div className='flex gap-2'>
					<select
						ref={addBankClientInput}
						className='w-48 p-2 bg-transparent outline-none rounded border border-white'>
						{clients.map((data, index) => (
							<option key={`Fazer banco - ${index}`} className='bg-black'>
								{data.name}
							</option>
						))}
					</select>
					<select
						ref={addBankTypeInput}
						className='w-48 p-2 bg-transparent outline-none rounded border border-white'>
						{banksTypesNames.map((data) => (
							<option key={`Fazer banco - ${data}`} value={data} className='bg-black'>
								{data}
							</option>
						))}
					</select>
					<button
						onClick={() => {
							if (addBankClientInput.current && addBankTypeInput.current)
								//@ts-ignore
								addBank(addBankClientInput.current.selectedIndex, addBankTypeInput.current.value);
						}}
						className='border border-white rounded hover:bg-neutral-800 transition p-2'>
						Adicionar Banco
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
