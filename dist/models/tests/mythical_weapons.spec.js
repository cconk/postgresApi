"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapons_1 = require("../mythical_weapons");
const store = new mythical_weapons_1.MythicalWeaponStore();
describe("Mythical Weapon Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should add a mythical weapon', async () => {
        const result = await store.create({
            name: 'light saber',
            type: 'Star Wars',
            weight: 5
        });
        expect(result).toEqual({
            id: 1,
            name: 'light saber',
            type: 'Star Wars',
            weight: 5
        });
    });
    it('index method should return a list of mythical weapon', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: 'light saber',
                type: 'Star Wars',
                weight: 5
            }]);
    });
    it('show method should return the correct mythical weapon', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'light saber',
            type: 'Star Wars',
            weight: 5
        });
    });
    // it('delete method should remove the mythical weapon', async () => {
    //   store.delete("1");
    //   const result = await store.index()
    //   expect(result).toEqual([]);
    // });
});
