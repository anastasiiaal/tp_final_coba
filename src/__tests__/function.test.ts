import { getDiceValue, getTeamScore } from '../modules/test'
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
            expect(getTeamScore(['vert', 'blue'])).toBe(6); // two dice here => 5 in ohther team
        });

        it('blue should be 2', () => {
            expect(getTeamScore(['vert', 'vert', 'vert', 'vert', 'blue'])).toBe(6); // 5 dice here so 2 in opposite
        });

        it('blue should be 1', () => {
            expect(getTeamScore(['vert', 'jaune', 'vert', 'vert', 'vert', 'blue'])).toBe(4); // 6 dice here so 1 in opposite
        });
    });
});