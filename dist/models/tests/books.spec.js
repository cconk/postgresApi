"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = require("../books");
const store = new books_1.BookStore();
describe("Book Model", () => {
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
    it('create method should add a book', async () => {
        const result = await store.create({
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: '2',
            summary: 'Childrens'
        });
        expect(result).toEqual({
            id: 1,
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: '2',
            summary: 'Childrens'
        });
    });
    it('index method should return a list of books', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                title: 'Bridge to Terabithia',
                total_pages: 250,
                author: 'Katherine Paterson',
                type: '2',
                summary: 'Childrens'
            }]);
    });
    it('show method should return the correct book', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: '2',
            summary: 'Childrens'
        });
    });
    it('delete method should remove the weapon', async () => {
        store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
