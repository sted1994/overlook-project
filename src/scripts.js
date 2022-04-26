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
const loginError = document.querySelector('.login-error')
const returnToDashButton = document.querySelector('.return-to-dashboard')

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
    } else {
      renderUserError(loginError, "Either the Username or Password you have entered is incorrect")
    }
})

makeNewReservatiolnButton.addEventListener('click', (event) => {
  const test = JSON.stringify(getCurrentDate())
  test.split(",")[0]
  dateInput.min = test.slice(0, 4) + '-' + test.slice(4, 6) + '-' + test.slice(6, 8)
  showElement([dashboardPage, mainPage, reservationPage], reservationPage)
})

submit.addEventListener('click', (event) => {
    event.preventDefault()
    renderAvaiableRooms(dateInput.value, roomTypeInput.value, "submit")
  })

resetFilterButton.addEventListener('click', (event) =>{
  event.preventDefault()
  renderAvaiableRooms(dateInput.value, 'select', "reset")
})

returnToDashButton.addEventListener('click', () => {
  console.log('test')
  showElement([dashboardPage, mainPage, reservationPage], mainPage)
  renderDashboard()
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
    hotelData.avaiableRooms.length > 0
      hotelData.avaiableRooms.forEach(room => {
       filteredReservations.innerHTML += newReservationCard(room, getRandomRoomImg(roomPaths), date)
    })
  } else if (date && roomType !== "select"){
    clearUserError(reservationError)
    filteredReservations.innerHTML = "";
    dateInput.value = ""
    roomTypeInput.value = 'select'
    if(hotelData.findRoomTypesAvailableOnDate(roomType, date).length > 0){
      hotelData.findRoomTypesAvailableOnDate(roomType, date).forEach(room => filteredReservations.innerHTML += newReservationCard(room, getRandomRoomImg(roomPaths), date))
    } else {
      renderUserError(reservationError, "We are so sorry, but all rooms meeting these criteria are booked.")
    }
  } else if(!date && event === 'submit'){
    renderUserError(reservationError, "Please select a day on whitch you would like to stay with us")
  } else {
    filteredReservations.innerHTML = ""
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
    if(password === 'overlook2021' && id <= hotelData.customers.length && (userName.includes('customer') || userName.includes('Customer'))){
      customer = new User(hotelData.customers.filter(customer => customer.id === id)[0])
      window.customer = customer
      return true
    } else {
      return false
    }
  }

const roomCard = (room, randomRoomPath) => {
 return `<article  tabindex="0" class="reservation">
    <p>${room.roomType}</p>
    <img class="room-image" src="${randomRoomPath}" alt="Randomly generated image of a hotel room">
    <div class="bed-information">
      <p>Bed Size: <span class="bed-size">${room.bedSize}</span></p>
      <p>Number of beds: <span class="bed">${room.numBeds}</span></p>
    </div>
    <p>Price Per Night: <span class="cost-per-night">${room.costPerNight}</span></p>
  </article>`
}

const addBooking = (roomNumber, userId, date) => {
  date = date.split("-").join("/")
  fetchRequests.makeBooking(roomNumber, userId, date)
  filteredReservations.innerHTML = ""
  renderUserError(reservationError, "Thank you for making a reservation with us.")
}

const newReservationCard = (room, randomRoomPath, date) => {
  window.date = date
 return `
  <article tabindex="0" class="reservation">
    <p class="${room.number} hidden"></p>
    <p>${room.roomType}</p>
    <img class="room-image" src="${randomRoomPath}" alt="Randomly generated image of a hotel room">
    <div class="bed-information">
      <p>Bed Size: <span class="bed-size">${room.bedSize}</span></p>
      <p>Number of beds: <span class="bed">${room.numBeds}</span></p>
    </div>
    <p>Price Per Night: <span class="cost-per-night">${room.costPerNight}</span></p>
    <button aria-label="Reserve this ${room.roomType}" onclick="addBooking(event.target.parentElement.firstChild.nextSibling.classList[0], customer.id, date)">Reserve This Room</button>
  </article>`
}

window.addBooking = addBooking
window.promise = promise;
window.fetchRequests = fetchRequests;

export {hotelData}
