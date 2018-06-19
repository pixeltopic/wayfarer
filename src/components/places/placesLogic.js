export const convertPriceLevel = (levelStr) => {
    // converts price level text to the proper number.
    switch(levelStr.toLowerCase()) {
        case "free": return 0;
        case "inexpensive": return 1;
        case "moderate": return 2;
        case "expensive": return 3;
        case "very expensive": return 4;
        default: return -1;
    }
}

export const reconvertPriceLevel = (levelNum) => {
    // converts number to the proper price level text.
    switch(levelNum) {
        case 0: return "Free";
        case 1: return "Inexpensive";
        case 2: return "Moderate";
        case 3: return "Expensive";
        case 4: return "Very Expensive";
        default: return "None";
    }
}