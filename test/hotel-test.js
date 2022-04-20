import chai from 'chai';
const expect = chai.expect;
import { data } from './data'
import Hotel from '../src/classes/hotel'


describe("Hotel Tests" , function(){

  let hotel;

  beforeEach(() => {
    hotel = new Hotel(data.bookings, data.rooms)
  });

  it("should be a function", () => {

    expect(Hotel).to.be.a('function')
  });

  it("Should be able to store all bookings", () => {

    expect(hotel.bookings.length).to.equal(11)
  });

  it("Should be able to tell you all rooms avilable to book on a date", () => {

    expect(hotel.findRoomsAvailableByDate('2022/02/19').length).to.equal(10)
  });

  it("Should be able to return all rooms that match type", () => {

    expect(hotel.findRoomsByType('single room').length).to.equal(6)
  });

  it("should return all rooms matching type on a day", () => {
    hotel.findRoomTypesAvailableOnDate('single room', '2022/02/19')
  });

  it("Should tell a user if the room they want is booked on the date they want", () => {

    expect(hotel.findConflicts('2022/02/19', 16)).to.equal("We are fiercly sorry, but that room is unavaiable on that date")
  })
})
