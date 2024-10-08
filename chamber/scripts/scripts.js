console.log("JavaScript file loaded!");

// Function to display the current year and last modified date
function displayFooterInfo() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = document.lastModified;
}

// Run on page load
displayFooterInfo();

// Toggle menu visibility
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
    closeIcon.classList.toggle('active');
});

closeIcon.addEventListener('click', () => {
    menu.classList.remove('show');
    hamburger.classList.remove('active');
    closeIcon.classList.remove('active');
});

// Fetch weather data and update the DOM
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption-desc');
const highTemp = document.querySelector('#max');
const lowTemp = document.querySelector('#min');
const humidity =document.querySelector('#humidity');
const sunRise = document.querySelector('#rise')
const sunSet = document.querySelector('#set')
const today= document.querySelector('#today');
const tuesday =document.querySelector('#tuesday');
const wednesday = document.querySelector('#wednesday');


// Replace the API key and make sure lat/lon are correct for Jinja
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0.44186&lon=33.18033&appid=0d30100fd45e2d175df6babe27c43b43&units=metric';

async function apifetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);  // Check the fetched data structure in the console

            // Extract the needed information from the data
            const temp = data.main.temp;
            const icon = data.weather[0].icon;
            const description = data.weather[0].description;
            const max = data.main.temp_max;
            const low = data.main.temp_min;
            const hum= data.main.humidity;
            const rise = data.sys.sunrise;
            const set = data.sys.sunset;
            const todayTemp=data.

            // Update the DOM elements with the fetched data
            currentTemp.textContent = `${temp.toFixed(1)}°C`;  // Display temperature
            weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;  // Weather icon URL
            captionDesc.textContent = description;  // Weather description
            highTemp.textContent=max;
            lowTemp.textContent=low;
            sunSet.textContent=set;
            sunRise.textContent=rise;
            humidity.textContent=hum;
            


        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

apifetch();

// Fetch members and display spotlight
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // Adjust file path as necessary
        const members = await response.json();
        const goldSilverMembers = members.filter(member => member['membership_level'] === 'Gold' || member['membership_level'] === 'Silver');
        const spotlightMembers = getRandomMembers(goldSilverMembers, 3);
        displaySpotlightMembers(spotlightMembers);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function getRandomMembers(members, count) {
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlightMembers(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            
            <img src="${member.image_url}" alt="${member.company} Logo">
            <div>
            <h3>${member.company}</h3>
            <p>Address:${member.address}</p>
            <p>TEL: ${member.phone}</p>
            <p>Membership: ${member.membership_level}</p>
            <p>URL: <a href="${member.website}">${member.website}</a></p>
            </div>
        `;
        spotlightContainer.appendChild(card);
    });
}

fetchMembers();

