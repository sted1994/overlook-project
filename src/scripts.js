import './css/styles.css';
import { fetchRequests } from './api-calls.js'
import './images/Lotus-Flower.svg'
import './images/hotel_room_1.png'
import './images/hotel_room_2.png'
import './images/hotel_room_3.png'
import './images/hotel_room_4.png'
import './images/hotel_room_5.png'
import Hotel from './classes/hotel.js'
import User from './classes/user.js'
import {roomPaths} from './roomImgPaths'

const submit = document.querySelector(".reservation-submit-btn")
const dateInput = document.querySelector(".date-search-field")
const roomTypeInput = document.querySelector(".search-field")
const loginButton = document.getElementById('login-button')
const userNameInput = document.getElementById('user-name-input')
const passwordInput = document.getElementById('password-input')
const loginPage = document.querySelector('.home-page')
const dashboardPage = document.querySelector('.home-page')
const mainPage = document.querySelector('.main-page')
const reservationPage = document.querySelector('.make-reservation-page')
const futureReservations = document.getElementById('future-reservations')
const pastReservations = document.getElementById('past-reservations')
const spendingSummaryElement = document.querySelector('.spending-total')
const userName = document.querySelector('.username')
const makeNewReservatiolnButton = document.querySelector('.make-reservation')
const filteredReservations = document.getElementById('filtered-reservations')
const resetFilterButton = document.getElementById('reset-filter-btn')
const reservationError = document.querySelector('.reservation-error')
const dashboard = document.querySelectorAll('.dashboard')
let hotelData;
let customer;

const promise = Promise.all([fetchRequests.getHotelData('rooms'), fetchRequests.getHotelData('bookings'), fetchRequests.getHotelData('customers')]).then(result => {
  defineHotelData(new Hotel(result[1].bookings, result[0].rooms, result[2].customers))

})

loginButton.addEventListener('click', (event) => {
  event.preventDefault()
  assignUser(userNameInput.value, passwordInput.value, hotelData.customers)
    if(assignUser(userNameInput.value, passwordInput.value, hotelData.customers) === true){
      showElement([dashboardPage, mainPage, reservationPage], mainPage)
      renderDashboard()
    }
})

makeNewReservatiolnButton.addEventListener('click', (event) => {
  showElement([dashboardPage, mainPage, reservationPage], reservationPage)
})

submit.addEventListener('click', (event) => {
    event.preventDefault()
    renderAvaiableRooms(dateInput.value, roomTypeInput.value, event)
  })

  resetFilterButton.addEventListener('click', (event) =>{
    event.preventDefault()
    renderAvaiableRooms(dateInput.value, 'select')
  })

const getCurrentDate = () =>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  const dateAsNumber = parseInt(today.split("/").join(""))
  return dateAsNumber
}

const getRandomRoomImg = (roomPaths) =>{
  return roomPaths[Math.floor(Math.random() * roomPaths.length)]
}

const renderReservations = (bookings, date, rooms) =>{
  pastReservations.innerHTML = ""
  futureReservations.innerHTML = ""
  bookings.forEach(booking => {
    if(parseInt(booking.date.split("/").join("")) < date){
      pastReservations.innerHTML += roomCard(hotelData.rooms.filter(room => room.number === booking.roomNumber)[0], getRandomRoomImg(roomPaths))
      } else if (parseInt(booking.date.split("/").join("")) > date){
        futureReservations.innerHTML += roomCard(hotelData.rooms.filter(room => room.number === booking.roomNumber)[0], getRandomRoomImg(roomPaths))
    }
  })
}

const renderDashboard = () => {
  customer.getBookings(hotelData.bookings)
  customer.generateSpendingSummary(hotelData.rooms)
  renderReservations(customer.bookings, getCurrentDate(), hotelData.rooms)
  renderSpendingTotal(customer.totalSpent)
  renderCustomerName()
}

const renderSpendingTotal = (spendingTotal) =>{
  spendingSummaryElement.innerText = spendingTotal
}

const renderCustomerName = () => {
  userName.innerText = customer.name
}

const renderUserError = (domElement, message) => {
  domElement.innerText = message
}

const clearUserError = (domElement) => {
  domElement.innerText = "";
}

const renderAvaiableRooms = (date, roomType, event) => {
  if(date && roomType === "select"){
    clearUserError(reservationError)
    filteredReservations.innerHTML = "";
    dateInput.value = ""
    hotelData.findRoomsAvailableByDate(date)
    hotelData.avaiableRooms.forEach(room => {
       filteredReservations.innerHTML += newReservationCard(room, getRandomRoomImg(roomPaths))
    })
  } else if (date && roomType !== "select"){
    clearUserError(reservationError)
    filteredReservations.innerHTML = "";
    dateInput.value = ""
    roomTypeInput.value = 'select'
    hotelData.findRoomTypesAvailableOnDate(roomType, date).forEach(room => {
       filteredReservations.innerHTML += newReservationCard(room, getRandomRoomImg(roomPaths))
    })
  } else {
    filteredReservations.innerHTML = ""
    // dashboard[1].style.justifyContent = ""
    renderUserError(reservationError, "Please make sure to specify a date you would like to book with us")
  }
}


const defineHotelData = (hotelSummary) => {
  hotelData = hotelSummary
}

const showElement = (hide, show) => {
  hide.map((element) => {
      element.classList.add('hidden');
    });
  show.classList.remove('hidden');
}

const assignUser = (userName, password, customers) => {
  const characters = userName.split('');
  const numbers = characters.filter(character => parseInt(character) || parseInt(character) === 0)
  const id = parseInt(numbers.join(''))
    if(password === 'overlook2021' && id <= hotelData.customers.length && userName.includes('customer')){
      customer = new User(hotelData.customers.filter(customer => customer.id === id)[0])
      return true
    } else {
      return false
    }
  }

const roomCard = (room, randomRoomPath) => {
 return `<article class="reservation">
    <p>${room.roomType}</p>
    <img class="room-image" src="${randomRoomPath}" alt="Randomly generated image of a hotel room">
    <div class="bed-information">
      <p>Bed Size: <span class="bed-size">${room.bedSize}</span></p>
      <p>Number of beds: <span class="bed">${room.numBeds}</span></p>
    </div>
    <p>Price Per Night: <span class="cost-per-night">${room.costPerNight}</span></p>
  </article>`
}

const newReservationCard = (room, randomRoomPath) => {
 return `<article class="reservation">
    <p>${room.roomType}</p>
    <img class="room-image" src="${randomRoomPath}" alt="Randomly generated image of a hotel room">
    <div class="bed-information">
      <p>Bed Size: <span class="bed-size">${room.bedSize}</span></p>
      <p>Number of beds: <span class="bed">${room.numBeds}</span></p>
    </div>
    <p>Price Per Night: <span class="cost-per-night">${room.costPerNight}</span></p>
    <button>Reserve This Room</button>
  </article>`
}
