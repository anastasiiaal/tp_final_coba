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

export function getTeamScore(dices: string[]) {
    let sum = 0;
    const total = dices.length;
    const otherTeamSize = 7 - total; // suppose the total nb of dice == 7 like in by Odin
    let minDiceValue = 3; // attribute the highest possible number (so that rose doesn't cansel itself)
    let minDiceCount = 0;

    dices.forEach((dice: string) => {
        let thisValue = getDiceValue(dice) ?? 0
        if (dice === 'orange') {
            if (total % 2 === 0) {
                thisValue += 1;
            }
        }

        if (dice === 'blue') {
            thisValue = otherTeamSize;
        }

        sum += thisValue;
        // logics to define the smallest dice in case we have pink
        if (thisValue < minDiceValue) {
            minDiceValue = thisValue;
            minDiceCount = 1;
        } else if (thisValue === minDiceValue && thisValue < 3) {
            minDiceCount++;
        }
    });

    dices.forEach((dice: string) => {
        if (dice === 'rose') {
            sum -= minDiceValue * minDiceCount;
        }
    });

    return sum;
}

export function areTeamsEqual(team1: string[], team2: string[]): boolean {
    const sortedTeam1 = team1.sort();
    const sortedTeam2 = team2.sort();
    return JSON.stringify(sortedTeam1) === JSON.stringify(sortedTeam2);
}

