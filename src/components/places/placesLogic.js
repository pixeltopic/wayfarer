export const convertPriceLevel = (level) => {
    // converts price level text to the proper number.
    switch(level.toLowerCase()) {
        case "free": return 0;
        case "inexpensive": return 1;
        case "moderate": return 2;
        case "expensive": return 3;
        case "very expensive": return 4;
        default: return -1;
    }
}