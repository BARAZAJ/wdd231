
// Fetch and display members
async function fetchMembers() {
  console.log("Fetching members...");
  try {
      const response = await fetch('members.json');  // Adjust path as necessary
      const members = await response.json();
      console.log(members); // Log the JSON data
      displayMembers(members);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

// Function to display members in the container
function displayMembers(members) {
  const container = document.getElementById('members-container');
  container.innerHTML = '';  // Clear any existing content

  members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      card.innerHTML = `
      <figure>
          <img src="${member.image_url}" alt="${member.company} logo">
          <figcaption>${member.name}</figcaption>
          <figcaption>${member.address}</figcaption>
      </figure>
      
      `;
      container.appendChild(card);
  });
}
window.onload = function() {
  fetchMembers();
  displayFooterInfo();
}; 
  











// Select the header element
const header = document.getElementById('header');

document.addEventListener("scroll", function() {
  const header = document.querySelector("header"); // Adjust if your header uses a different tag
  if (window.scrollY > 10) { // Change 50 to the scroll amount you want
      header.classList.add("scrolled");
  } else {
      header.classList.remove("scrolled");
  }
});


    const hamburger = document.querySelector('.hamburger'); 
    const closeIcon = document.querySelector('.close-icon');
    const menu = document.querySelector('.mobile-nav');
    const hidemenu = document.querySelector('.logo')
    
    // Show the menu and toggle between hamburger and X icons
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('show');
      hamburger.classList.toggle('active');
      closeIcon.classList.toggle('active');
      hidemenu.classList.add('hide');

      
    });
    
    // Hide the menu when the X icon is clicked
    closeIcon.addEventListener('click', () => {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      closeIcon.classList.remove('active');
      hidemenu.classList.remove('hide');
     
      
    });

    function displayFooterInfo() {
      const yearElement = document.getElementById('year');
      const lastModifiedElement = document.getElementById('last-modified');
      
      yearElement.textContent = new Date().getFullYear();
      lastModifiedElement.textContent = document.lastModified;
  }
  
  // Run on page load
  displayFooterInfo();

  fetchMembers();
  displayFooterInfo();
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
