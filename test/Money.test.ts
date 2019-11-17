import { Money, Expression, Sum, Bank } from "../src/Money";

test("Multiplication", () => {
    const five: Money = Money.dollar(5);
    const bank = new Bank();
    expect(bank.reduce(five.times(2), "USD").equals(Money.dollar(10))).toBeTruthy();
    expect(bank.reduce(five.times(3), "USD").equals(Money.dollar(15))).toBeTruthy();
});

test("Equality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});

test("Currency", () => {
    expect(Money.dollar(1).currency).toBe("USD");
    expect(Money.franc(1).currency).toBe("CHF");
});

test("SimpleAddition", () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    expect(Money.dollar(10).equals(reduced)).toBeTruthy();
});

test("ReduceSum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(7).equals(result)).toBeTruthy();
});

test("ReduceMoney", () => {
    const bank = new Bank()
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(result.equals(Money.dollar(1))).toBeTruthy();
});

test("ReduceMoneyDifferentCurrency", () => {
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(Money.franc(2), "USD");
    expect(Money.dollar(1).equals(result)).toBeTruthy();
});

test("IdentityRate", () => {
    expect(new Bank().rate("USD", "USD")).toBe(1);
});

test("MixedAddition", () => {
    const fiveBucks = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
    expect(result.equals(Money.dollar(10))).toBeTruthy();
});
