import './css/styles.css';
import { fetchRequests } from './api-calls.js'
import './images/Lotus-Flower.svg'
import Hotel from './classes/hotel.js'

//const submit = document.querySelector(".reservation-submit-btn")
const date = document.querySelector(".date-search-field")
const loginButton = document.getElementById('login-button')
const userNameInput = document.getElementById('user-name-input')
const passwordInput = document.getElementById('password-input')
// submit.addEventListener('click', function(event){
//   event.preventDefault()
//   console.log(date.value)
// })
let hotelData;
let customer;

loginButton.addEventListener('click', function(event){
  event.preventDefault()
  assignUser(userNameInput.value, passwordInput.value, hotelData.customers)
})

const promise = Promise.all([fetchRequests.getHotelData('rooms'), fetchRequests.getHotelData('bookings'), fetchRequests.getHotelData('customers')]).then(result => {
    defineHotelData(new Hotel(result[1], result[0], result[2].customers))
})


const defineHotelData = (hotelSummary) => {
  hotelData = hotelSummary
}

const assignUser = (userName, password, customers) => {
  const characters = userName.split('');
  const numbers = characters.filter(character => parseInt(character) || parseInt(character) === 0)
  const id = parseInt(numbers.join(''))
  if(password === 'overlook2021' && id <= hotelData.customers.length && userName.includes('customer')){
    customer = hotelData.customers.filter(customer => customer.id === id)[0]
    return true
  } else {
    return false
  }
  }

const roomCard = (room, roomImg) => {
 `<article class="reservation">
    <p>${room.roomType}</p>
    <img class="room-image" src="${roomImg}" alt="Randomly generated image of a hotel room">
    <div class="bed-information">
      <p>Bed Size: <span class="bed-size">${room.bedSize}</span></p>
      <p>Number of beds: <span class="bed">${room.numBeds}</span></p>
    </div>
    <p>Price Per Night: <span class="cost-per-night">${room.costPerNight}</span></p>
  </article>`
}



// console.log('This is the JavaScript entry file - your code begins here.');
// getData('rooms')
