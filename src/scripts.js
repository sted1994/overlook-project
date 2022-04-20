// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import { getData } from './api-calls.js'
import './images/Lotus-Flower.svg'
//import './images/overlook.jpeg'
console.log('This is the JavaScript entry file - your code begins here.');
getData('rooms')
