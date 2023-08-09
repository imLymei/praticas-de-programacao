import BankMovement from "./bankMovement";
import Client from "./client";

export default class BankAccount {
  client: Client;
  bankType: "total" | "simples" | "economica";
  bankMovementHistory: BankMovement[];

  constructor(client: Client, bankType: "total" | "simples" | "economica") {
    this.client = client;
    this.bankMovementHistory = [];
    this.bankType = bankType;
  }

  doDeposit(description: string, amount: number) {
    this.bankMovementHistory.push(new BankMovement(description, amount));
  }

  withdraw(description: string, amount: number) {
    this.bankMovementHistory.push(new BankMovement(description, -amount));
  }

  getBalance() {
    return this.bankMovementHistory.reduce(
      (prev, data) => prev + data.amount,
      0
    );
  }

  getPayment() {
    const balance = this.getBalance();

    console.log("CALCULANDO");

    console.log("TOTAL", balance);

    if (this.bankType === "total") {
      const percentage =
        balance <= 200 ? 0 : balance >= 2000 ? 1 : (balance - 200) / 1800;

      console.log("PORCENTAGEM", percentage);

      console.log("DESCONTO", 1 - percentage);

      return 50 * (1 - percentage);
    }

    if (this.bankType === "simples") {
      const movementCost =
        this.bankMovementHistory.length <= 5
          ? 0
          : this.bankMovementHistory.length - 5;

      const percentage =
        balance <= 100 ? 0 : balance >= 1500 ? 1 : (balance - 100) / 1400;

      return (movementCost + 20) * (1 - percentage);
    }

    const movementCost = this.bankMovementHistory.length * 1.5;

    return movementCost + 10;
  }
}
