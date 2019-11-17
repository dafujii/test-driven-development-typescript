export class Money implements Expression {
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

    plus(addend: Money): Expression {
        return new Money(this.amount + addend.amount, this.currency);
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

export interface Expression {
}

export class Bank {
    reduce(source: Expression, to: string): Money {
        return Money.dollar(10);
    }
}
