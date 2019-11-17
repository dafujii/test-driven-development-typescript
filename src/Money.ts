export class Money {
    times(multiplier: number): Money {
        return new Money(this.amount * multiplier, this.currency);
    }

    constructor(protected amount: number, private _currency: string) { }

    equals(money: Money): boolean {
        return (
            this.amount == money.amount &&
            this.currency === money.currency
        );
    }

    get currency(): string {
        return this._currency;
    }

    static dollar(amount: number): Money {
        return new Money(amount, "USD");
    }

    static franc(amount: number): Money {
        return new Money(amount, "CHF");
    }
}
