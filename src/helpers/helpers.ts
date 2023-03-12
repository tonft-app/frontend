export const parseFloatPrice = (price: string) => {
    const parsedPrice = parseFloat(price);

    if(parsedPrice  > 1.1){
        return parsedPrice.toFixed(0);
    } else {
        return parsedPrice.toFixed(2);
    }
}



export const parseFloatPriceFloat = (price: number) => {
    if(price  > 1.1){
        return price.toFixed(2);
    } else if (price > 0) {
        return price. toFixed(2)
    }  else {
        return price.toFixed(2);
    }
}


