const expect = require('expect');
const { Users } = require('./users');

describe('User', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Bob',
        room: 'A'
      },
      {
        id: 2,
        name: 'Jim',
        room: 'B'
      },
      {
        id: 3,
        name: 'Bo',
        room: 'A'
      }
    ];
  });

  it('Should add new user', () => {
    let users = new Users();
    let user = {
      id: 123,
      name: 'Bob',
      room: 'Cats'
    };

    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should remove a user', () => {
    let removedUser = users.removeUser(1);
    expect(removedUser.id).toEqual(1);
  });

  it('Should not remove a user', () => {
    let removedUser = users.removeUser(400);
    expect(removedUser).toBeUndefined();
  });

  it('Should find user', () => {
    let foundUser = users.getUser(2);
    expect(foundUser.name).toEqual('Jim');
  });

  it('Should not find user', () => {
    let foundUser = users.getUser(5);
    expect(foundUser).toBeUndefined();
  });

  it('Should return names for A', () => {
    let userList = users.getUserList('A');
    expect(userList).toEqual(['Bob', 'Bo']);
  });

  it('Should return names for B', () => {
    let userList = users.getUserList('B');
    expect(userList).toEqual(['Jim']);
  });
});
