export default class Log {
	static logInstance: Log | null = null;
	logs: string[];

	private constructor() {
		this.logs = [];
		console.log('LOG CRIADO');
	}

	static getInstance() {
		if (this.logInstance === null) this.logInstance = new Log();
		return this.logInstance;
	}

	createLog(description: string) {
		this.logs.push(`${description} - ${new Date().toLocaleString()}`);
		console.log(this.logs);
	}
}
