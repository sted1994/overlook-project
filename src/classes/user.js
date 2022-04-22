class User{
  constructor(user){
    this.id = user.id;
    this.name = user.name;
    this.bookings;
    this.totalSpent;
  }

  getBookings(allBookings){
    return this.bookings = allBookings.filter(booking => booking.userID === this.id)
  }

  generateSpendingSummary(rooms){
    const total = rooms.reduce((spent, room) => {
      this.bookings.forEach(booking => {
        if(booking.roomNumber === room.number){
          spent += room.costPerNight
        }
      })
      return spent
    }, 0)
    this.totalSpent = total.toFixed(2)
  }

}

export default User
