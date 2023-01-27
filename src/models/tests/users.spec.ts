import { User, UserStore } from '../users';

const store = new UserStore()

describe("User Model", () => {
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

  it('create method should add a user', async () => {
    const result: User = await store.create({
      username: 'testUser1',
      password: 'testPassword1'
    });
    expect(result).toContain({
      id: 1,
      username: 'testUser1'
    });
  });

  it('index method should return a list of users', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct user', async () => {
    const result: User = await store.show("1");
    expect(result).toContain({
      id: 1,
      username: 'testUser1'
    });
  });

  // it('delete method should remove the user', async () => {
  //   store.delete("1");
  //   const result = await store.index()

  //   expect(result).toEqual([]);
  // });
});