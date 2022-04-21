

const fetchRequests = {
  getHotelData(path){
    const result = fetch(`http://localhost:3001/api/v1/${path}`)
      .then(response => response.json(response))
      .then(data => {
        return data
      })
      // console.log(result)
      return result
  },
  getUser(id){
    const result = fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => response.json(response))
      .then(data => {
        return data
      })
      return result
  },


}

// const hotelData = {
//   users = getData('users')
// }


export { fetchRequests }
