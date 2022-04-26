import { hotelData} from './scripts'

const fetchRequests = {
  getHotelData(path){
    const result = fetch(`http://localhost:3001/api/v1/${path}`)
      .then(response => response.json(response))
      .then(data => {
        return data
      })
      return result
  },
  getUser(id){
    const result = fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => response.json(response))
      .then(data => {
        return data
      })
      .catch(err => console.log(err))
      return result
  },
  makeBooking(roomNumber, userId, date){
    date = date.split("-").join("/")
    const itemToAdd = fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": parseInt(roomNumber)
    }),
    headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(data => {
    console.log(data.message)
    return data
    })
    .then(test => fetchRequests.getHotelData('bookings'))
    .then(result => hotelData.bookings = result.bookings)
  },

}

window.fetchRequests = fetchRequests

export { fetchRequests }
