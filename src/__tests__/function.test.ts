import { getDiceValue } from '../modules/test'
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
            expect(getDiceValue('orange')).toBe(0);
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
});