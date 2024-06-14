export function getDiceValue(dice: string) {
    switch (dice) {
        case 'vert':
            return 1
        case 'gris':
            return 2
        case 'orange':
            return 0
        case 'jaune':
            return -1
        case 'blue':
            return 0
        case 'rose':
            return 3
    }
}