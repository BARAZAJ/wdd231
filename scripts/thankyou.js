// Get all navigation links
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});


// Check for 'firstVisit' key in localStorage
if (!localStorage.getItem("firstVisit")) {
  // If not found, set the current date and time as the first visit
  const firstVisitTime = new Date().toLocaleString();  // format the date and time
  localStorage.setItem("firstVisit", firstVisitTime);
  console.log("First visit recorded:", firstVisitTime);
} else {
  // If 'firstVisit' exists, retrieve and display it
  const firstVisitTime = localStorage.getItem("firstVisit");
  console.log("You first visited this page on:", firstVisitTime);
}

// You can also display this information on the webpage if desired
document.getElementById("first-visit").innerText = `You first submitted this application on: ${localStorage.getItem("firstVisit")}`;





const currentUrl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);

// Function to get the value for a given query parameter
function show(param) {
    let result = urlParams.get(param);
    if (result) {
        // Replace URL-encoded characters, e.g., %40 for @ in emails
        result = result.replace("%40", "@");
    }
    return result || "N/A"; // Return 'N/A' if the parameter is not found
}

// Get the element where we want to display the details
const appdetails = document.querySelector('#detail');

    // Set the inner HTML of the details element
    appdetails.innerHTML = `
        <p><strong>First name            :</strong> ${show("first-name")}</p>
        <p><strong>Last name             :</strong> ${show("last-name")}</p>
        <p><strong>Email                 :</strong> ${show("email")}</p>
        <p><strong>Tel                   :</strong> ${show("mobile")}</p>
        <p><strong>Voluntary option      :</strong> ${show("membership-level")}</p>
    `;  
  
    
    



function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  
  document.querySelector("#find-me").addEventListener("click", geoFindMe);
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
    geoFindMe();
  
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
