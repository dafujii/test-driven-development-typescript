export class Money implements Expression {
    constructor(private _amount: number, private _currency: string) { }

    times(multiplier: number): Money {
        return new Money(this.amount * multiplier, this.currency);
    }

    equals(money: Money): boolean {
        return (
            this.amount == money.amount &&
            this.currency === money.currency
        );
    }

    plus(addend: Money): Expression {
        return new Sum(this, addend);
    }

    reduce(to: string): Money {
        return this;
    }

    get amount(): number {
        return this._amount;
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
    reduce(to: string): Money;
}

export class Bank {
    reduce(source: Expression, to: string): Money {
        return source.reduce(to);
    }
}

export class Sum implements Expression {
    constructor(public augend: Money, public addend: Money) {
    }

    reduce(to: string): Money {
        const amount = this.augend.amount + this.addend.amount;
        return new Money(amount, to);
    }
}
