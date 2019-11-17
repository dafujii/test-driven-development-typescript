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

    reduce(bank: Bank, to: string): Money {
        const rate = bank.rate(this.currency, to);
        return new Money(this.amount / rate, to);
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
    reduce(bank: Bank, to: string): Money;
}

export class Bank {
    rates: Map<string, number> = new Map();
    reduce(source: Expression, to: string): Money {
        return source.reduce(this, to);
    }

    private getRateKey(from: string, to: string): string {
        return `${from}-${to}`;
    }

    addRate(from: string, to: string, rate: number): void {
        this.rates.set(this.getRateKey(from, to), rate);
    }

    rate(from: string, to: string): number {
        if (from === to) {
            return 1;
        }
        const rate = this.rates.get(this.getRateKey(from, to));
        if (!rate) {
            throw "未定義の為替レートです";
        }
        return rate;
    }
}

export class Sum implements Expression {
    constructor(public augend: Money, public addend: Money) {
    }

    reduce(bank: Bank, to: string): Money {
        const amount = this.augend.amount + this.addend.amount;
        return new Money(amount, to);
    }
}
