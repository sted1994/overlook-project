class Hotel{
  constructor(bookings, rooms, customers){
    this.bookings = bookings;
    this.rooms = rooms;
    this.avaiableRooms;
    this.customers = customers;
  }

  findRoomsAvailableByDate(date){
    let roomsAvaibleByDate = []
    date = date.split("-").join("/")
    this.avaiableRooms = this.rooms
    const conflicts = this.bookings.filter(booking => (booking.date === date)).map(booking => booking.roomNumber)
    this.avaiableRooms.forEach((room, index) => {
      if(!conflicts.includes(room.number)){
        roomsAvaibleByDate.push(room)
      }
    })
    return roomsAvaibleByDate
  };

  findRoomsByType(type){
    return this.rooms.filter(room => room.roomType === type)
  };

  findRoomTypesAvailableOnDate(type, date){
    const roomsAvaibleByDate = this.findRoomsAvailableByDate(date);
    const roomsMatchingType = this.findRoomsByType(type);
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
