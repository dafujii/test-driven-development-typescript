export abstract class Money {
    abstract times(multiplier: number): Money;

    constructor(protected amount: number, private _currency: string) {}

    equals(money: Money): boolean {
        return (
            this.amount == money.amount &&
            this.constructor === money.constructor
        );
    }

    currency(): string {
        return this._currency;
    }

    static dollar(amount: number): Money {
        return new Dollar(amount, "USD");
    }

    static franc(amount: number): Money {
        return new Franc(amount, "CHF");
    }
}

export class Dollar extends Money {
    times(multiplier: number): Money {
        return Money.dollar(this.amount * multiplier);
    }
}

export class Franc extends Money {
    times(multiplier: number): Money {
        return Money.franc(this.amount * multiplier);
    }
}
