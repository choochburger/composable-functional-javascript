const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const removeSpaces = str =>
    str.replace(/\$/g, '')

const moneyToFloat = str =>
    Box(str)
        .map(removeSpaces)
        .map(r => parseFloat(r))

const percentToFloat = str =>
    Box(str)
        .map(removeSpaces)
        .map(replaced => parseFloat(replaced))
        .map(number => number * 0.01)

const applyDiscount = (price, discount) =>
    moneyToFloat(price)
        .fold(cost =>
            percentToFloat(discount)
                .fold(savings => cost - cost * savings)
        )

const result = applyDiscount('$5.00', '50%')

console.log(result)
