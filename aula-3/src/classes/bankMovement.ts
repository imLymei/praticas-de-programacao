export default class BankMovement {
    description: string
    amount: number

    constructor (description: string, amount: number){
        this.description = description
        this.amount = amount
    }
}