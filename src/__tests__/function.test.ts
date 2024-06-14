import { getDiceValue, getTeamScore, areTeamsEqual } from '../modules/test'
import { expect, describe, it } from 'vitest';

describe('findMatch', () => {
    describe('single dice', () => {
        it('case: vert', () => {
            expect(getDiceValue('vert')).toBe(1);
        });
        it('case: gris', () => {
            expect(getDiceValue('gris')).toBe(2);
        });
        it('case: orange', () => {
            expect(getDiceValue('orange')).toBe(1);
        });
        it('case: jaune', () => {
            expect(getDiceValue('jaune')).toBe(-1);
        });
        it('case: rose', () => {
            expect(getDiceValue('rose')).toBe(3);
        });
        it('case: blue', () => {
            expect(getDiceValue('blue')).toBe(0);
        });
    });

    describe('simple group sum (no exceptions)', () => {
        it('case: vert + vert', () => {
            expect(getTeamScore(['vert', 'vert'])).toBe(2);
        });

        it('case: gris + jaune', () => {
            expect(getTeamScore(['gris', 'jaune'])).toBe(1);
        });
    });

    describe('orange exception', () => {
        it('even group => orange == 2', () => {
            expect(getTeamScore(['vert', 'orange'])).toBe(3);
        });

        it('odd group => orange == 1', () => {
            expect(getTeamScore(['vert', 'vert', 'orange'])).toBe(3);
        });
    });

    describe('blue exception', () => {
        it('blue should be 5', () => {
            // two dice here => 5 in ohther team
            expect(getTeamScore(['vert', 'blue'])).toBe(6); 
        });

        it('blue should be 5', () => {
            // 3 dice here => both blue should be == 4
            expect(getTeamScore(['vert', 'blue', 'blue'])).toBe(9); 
        });

        it('blue should be 2', () => {
            // 5 dice here so 2 in opposite
            expect(getTeamScore(['vert', 'vert', 'vert', 'vert', 'blue'])).toBe(6); 
        });

        it('blue should be 1', () => {
            // 6 dice here so 1 in opposite
            expect(getTeamScore(['vert', 'jaune', 'vert', 'vert', 'vert', 'blue'])).toBe(4);
        });
    });

    describe('rose exception', () => {
        it('should make green == 0', () => {
            expect(getTeamScore(['rose', 'vert'])).toBe(3);
        });

        it('should make both green == 0', () => {
            expect(getTeamScore(['rose', 'vert', 'vert'])).toBe(3);
        });

        it('should make both green == 0', () => {
            expect(getTeamScore(['rose', 'gris', 'vert', 'vert'])).toBe(5);
        });

        it('should make jaune == 0', () => {
            expect(getTeamScore(['rose', 'jaune', 'vert'])).toBe(4);
        });

        it('rose should not cancel itself', () => {
            expect(getTeamScore(['rose', 'rose'])).toBe(6);
        });
    });

    describe('combination of exceptions', () => {
        it('orange + blue exception', () => {
            // blue should be 4 && orange be 1
            expect(getTeamScore(['vert', 'orange', 'blue'])).toBe(6);
        });

        it('orange + rose exception', () => {
            // both green & orange should be cancelled as they == 1
            expect(getTeamScore(['vert', 'rose', 'orange'])).toBe(3); 
        });

        it('orange + rose exception', () => {
            // orange should not be cancelled because it equals to 2
            expect(getTeamScore(['vert', 'vert', 'rose', 'orange'])).toBe(5); 
        });

        it('blue + rose exception', () => {
            // bleu shoukd be == 3 and not cancelled
            expect(getTeamScore(['vert', 'vert', 'rose', 'blue'])).toBe(6); 
        });

        it('orange + rose exception', () => {
            // both green & blue should be cancelled as they == 1
            expect(getTeamScore(['vert', 'vert', 'vert', 'vert', 'rose', 'blue'])).toBe(3); 
        });
    });

    describe('teams equality', () => {
        it('should consider teams with the same elements as equal', () => {
            const team1 = ['vert', 'rose', 'orange'];
            const team2 = ['vert', 'orange', 'rose'];
            expect(areTeamsEqual(team1, team2)).toBe(true);
        });

        it('should NOT consider different teams as equal', () => {
            const team1 = ['vert', 'rose', 'orange'];
            const team2 = ['vert', 'vert', 'orange'];
            expect(areTeamsEqual(team1, team2)).toBe(false);
        });
    });
});