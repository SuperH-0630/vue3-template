export const getRealPrice = (realPrice?: number): number => {
    if (typeof realPrice === "number" && realPrice >= 0) {
        return realPrice
    }

    return 0
}

export const getFacePrice = (hotPrice?: number, realPrice?: number): number => {
    realPrice = getRealPrice(realPrice)

    if (typeof hotPrice !== "number" || hotPrice < 0) {
        return realPrice
    }

    if (hotPrice < realPrice) {
        return hotPrice
    }

    return realPrice
}

export const getTotalPrice = (hotPrice?: number, realPrice?: number, num?: number): number => {
    if (typeof num !== "number" || num <= 0) {
        return 0
    }

    return getFacePrice(hotPrice, realPrice) * num
}