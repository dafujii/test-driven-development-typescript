import { Money, Expression, Sum, Bank } from "../src/Money";

test("testMultiplication", () => {
    const five: Money = Money.dollar(5);
    expect(five.times(2).equals(Money.dollar(10))).toBeTruthy();
    expect(five.times(3).equals(Money.dollar(15))).toBeTruthy();
});

test("testEquality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});

test("testCurrency", () => {
    expect(Money.dollar(1).currency).toBe("USD");
    expect(Money.franc(1).currency).toBe("CHF");
});

test("testSimpleAddition", () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    expect(Money.dollar(10).equals(reduced)).toBeTruthy();
});

test("testPlusReturnSum", () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    const sum = result;
    expect(sum.augend.equals(five)).toBeTruthy();
    expect(sum.addend.equals(five)).toBeTruthy();
});

test("testReduceSum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(7).equals(result)).toBeTruthy();
});

test("testReduceMoney", () => {
    const bank = new Bank()
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(result.equals(Money.dollar(1))).toBeTruthy();
})
