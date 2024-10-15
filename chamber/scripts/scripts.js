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

// Fetch weather data and update the DOM
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption-desc');
const highTemp = document.querySelector('#max');
const lowTemp = document.querySelector('#min');
const Humidity =document.querySelector('#humidity');
const sunRise = document.querySelector('#rise')
const sunSet = document.querySelector('#set')
const today= document.querySelector('#today');
const tuesday =document.querySelector('#tuesday');
const wednesday = document.querySelector('#wednesday');
const todayTemp = document.querySelector('#today')
const tuesdayTemp = document.querySelector('#tuesday')
const wednesdayTemp = document.querySelector('#wednesday')


// Replace the API key and make sure lat/lon are correct for Jinja
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=0.44186&lon=33.18033&appid=0d30100fd45e2d175df6babe27c43b43&units=metric'
async function apifetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);  // Check the fetched data structure in the console

            const icon = data.list[0].weather[0].icon;  // Extract the icon code
            const description = data.list[0].weather[0].description;  // Extract the weather description

            const temp = data.list[0].main.temp;
           // const icon = data.list[0].weather[0].icon;
          //  const description = data.list[0].weather[0].description;
            const max = data.list[0].main.temp_max;
            const min = data.list[0].main.temp_min;
            const humidity = data.list[0].main.humidity;
            const sunrise = new Date(data.city.sunrise * 1000); // Convert Unix timestamp to JS Date object
            const sunset = new Date(data.city.sunset * 1000);   // Convert Unix timestamp to JS Date object
            const todaytemp = data.list[0].main.temp;
            const tuesdaytemp = data.list[1].main.temp;
            const wednesdaytemp = data.list[2].main.temp;
            

            // Update the DOM elements with the fetched data
            currentTemp.textContent = `${temp.toFixed(1)}°C`;  // Display temperature
           // weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;  // Weather icon URL
            captionDesc.textContent = description;  // Weather description
            highTemp.textContent=`${max.toFixed(1)}°C`;
            lowTemp.textContent=`${min.toFixed(1)}°C`;
            sunSet.textContent=sunset;
            sunRise.textContent=sunrise;
            Humidity.textContent=humidity;
            todayTemp.textContent=`${todaytemp.toFixed(1)}°C`;
            tuesdayTemp.textContent=`${tuesdaytemp.toFixed(1)}°C`;
            wednesdayTemp.textContent=`${wednesdaytemp.toFixed(1)}°C`;

            
          


        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

apifetch();

const dialogBox = document.querySelector("#dialogbox");
const dialogBoxText = document.querySelector("#dialogbox div");
const closeButton = document.querySelector("#closebutton");
const npButton = document.querySelector("#npbutton");
const bronzeButton = document.querySelector("#bronzebutton");
const silverButton = document.querySelector("#silverbutton");
const goldButton = document.querySelector("#goldbutton");


npButton.addEventListener("click",() =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML=`<p>low costs. Only 20 dollars per month</p>`
});

bronzeButton.addEventListener("click",() =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML=`<p>medium costs. Only 50 dollars per month</p>
    <p>comes with additional privileges</p>`
});

silverButton.addEventListener("click",() =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML=`<p>higher costs. Only 100 dollars per month</p>
    <p> This is the best option if u are broke</p>
    `
});

goldButton.addEventListener("click",() =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML=`<p>Highest costs. Only 200 dollars per month</p>
    <p>This is for the bosses</p>
    <p> This comes with the highest privileges</p>
    <p> You will be the coolest</p>
    `
});

closeButton.addEventListener("click",() =>{
    dialogBox.close();
})

window.onload = function() {
    const cards = document.querySelectorAll('.membership-cards .card');
    cards.forEach((card, index) => {
        // Add 'visible' class to each card with a slight delay for staggered animation
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);  // Adjust the delay between each card animation (200ms in this case)
    });
};



const currentUrl = window.location.href;
console.log(currentUrl)     










































