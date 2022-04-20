import chai from 'chai';
const expect = chai.expect;
import { data } from './data'
import User from '../src/classes/user'

describe('User tests', function() {
  let user;

  beforeEach(() => {
    user = new User(data.users[1])
  })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('Should store a users ID', function() {
    expect(user.id).to.equal(data.users[1].id)
  });

  it('Should store the name of a user', function() {
    expect(user.name).to.equal(data.users[1].name)
  });

  it('Should be able to determine all bookings a user has made', function(){
    user.getBookings(data.bookings);

    expect(user.bookings.length).to.equal(2)
  });

  it('Should be able to tell a user how much they have spent', function(){
    user.getBookings(data.bookings);
    user.generateSpendingSummary(data.rooms);
    expect(user.totalSpent).to.equal(565.64)
  })
});
