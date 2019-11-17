import { Money, Dollar, Franc } from "../src/Money";

test("testMultiplication", () => {
    const five: Money = Money.dollar(5);
    expect(five.times(2).equals(Money.dollar(10))).toBeTruthy();
    expect(five.times(3).equals(Money.dollar(15))).toBeTruthy();
});

test("testEquality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
    expect(Money.franc(5).equals(Money.franc(5))).toBeTruthy();
    expect(Money.franc(5).equals(Money.franc(6))).toBeFalsy();
    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});

test("testFrancMultiplication", () => {
    const five = Money.franc(5);
    expect(five.times(2).equals(Money.franc(10))).toBeTruthy();
    expect(five.times(3).equals(Money.franc(15))).toBeTruthy();
});

test("testCurrency", () => {
    expect(Money.dollar(1).currency).toBe("USD");
    expect(Money.franc(1).currency).toBe("CHF");
});

test("testDifferentClassEquality", () => {
    expect(new Money(10, 'CHF').equals(new Franc(10, 'CHF'))).toBeTruthy();
});
