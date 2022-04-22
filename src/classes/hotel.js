class Hotel{
  constructor(bookings, rooms, customers){
    this.bookings = bookings;
    this.rooms = rooms;
    this.avaiableRooms;
    this.customers = customers;
  }

  findRoomsAvailableByDate(date){
    date = date.split("-").join("/")
    console.log(date)
    this.avaiableRooms = this.rooms
    const conflicts = this.bookings.filter(booking => (booking.date === date))
    this.avaiableRooms.forEach(room => {
      conflicts.forEach(conflict => {
        if(conflict.roomNumber === room.number){
          this.avaiableRooms.splice(this.avaiableRooms.indexOf(room), 1)
        }
      })
    })
    return this.avaiableRooms
  };

  findRoomsByType(type){
    return this.rooms.filter(room => room.roomType === type)
  };

  findRoomTypesAvailableOnDate(type, date){
    const roomsMatchingType = this.findRoomsByType(type);
    const roomsAvaibleByDate = this.findRoomsAvailableByDate(date);
    console.log(roomsMatchingType)
    const roomsByTypeAndDate = roomsMatchingType.reduce((searchResult, room) => {
      roomsAvaibleByDate.forEach(roomByDate => {
        if(room.number === roomByDate.number){
          searchResult.push(roomByDate)
        }
      })
      return searchResult
    }, [])
    return roomsByTypeAndDate
  }

  findConflicts(date, roomNumber){
    date = date.split("-").join("/")
    const conflicts = this.bookings.filter(booking => booking.date === date && booking.roomNumber === roomNumber)
      if(conflicts.length){
        return "We are fiercly sorry, but that room is unavaiable on that date"
      }
  };
}

export default Hotel
