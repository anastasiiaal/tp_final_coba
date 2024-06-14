export function getDiceValue(dice: string) {
    switch (dice) {
        case 'vert':
            return 1
        case 'gris':
            return 2
        case 'orange':
            return 1 // will be modified  if needed
        case 'jaune':
            return -1
        case 'blue':
            return 0 // will be modified if needed
        case 'rose':
            return 3
    }
}

export function getTeamScore(dices: string) {
    let sum = 0;
    const total = dices.length;
    const otherTeamSize = 7 - total;

    let valueOrange = 0;
    const valueBlue = otherTeamSize;
    let valuePink = 0;
    let minDiceValue = 3; // attribute the highest possible number
    let minDiceCount = 0;

    dices.forEach((dice: string) => {
        const thisValue = getDiceValue(dice) ?? 0
        if (thisValue < minDiceValue) {
            minDiceValue = thisValue;
            minDiceCount = 1;
        } else if (thisValue === minDiceValue) {
            minDiceCount++;
        }
        sum += thisValue;
    });

    if (total % 2 === 0) {
        valueOrange++;
    }

    valuePink = minDiceValue * minDiceCount;
    sum = sum + valueOrange + valueBlue + valuePink;

    return sum;
}



