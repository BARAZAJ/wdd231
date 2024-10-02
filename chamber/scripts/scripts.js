console.log("JavaScript file loaded!");

// Function to display the current year and last modified date
function displayFooterInfo() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = document.lastModified;
}

// Fetch and display members
async function fetchMembers() {
    console.log("Fetching members...");
    try {
        const response = await fetch('data/members.json');  // Adjust path as necessary
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
            <img src="${member.image_url}" alt="${member.company} logo">
            <h2>${member.company}</h2>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member['phone-number']}</p>
            <p>Website: <a href="https://${member.website}" target="_blank">${member.website}</a></p>
            <p>Employees: ${member.employees}</p>
            <p>Membership Level: ${member['membership-level']}</p>
        `;
        container.appendChild(card);
    });
}

// Toggle between grid and list views
document.getElementById('toggle-grid').addEventListener('click', function() {
    document.getElementById('members-container').className = 'grid-view';
});

document.getElementById('toggle-list').addEventListener('click', function() {
    document.getElementById('members-container').className = 'list-view';
});

// Run on page load
window.onload = function() {
    fetchMembers();
    displayFooterInfo();
};

const hamburger = document.querySelector('.hamburger'); 
const closeIcon = document.querySelector('.close-icon');
const menu = document.querySelector('.menu');

// Show the menu and toggle between hamburger and X icons
hamburger.addEventListener('click', () => {
  menu.classList.toggle('show');
  hamburger.classList.toggle('active');
  closeIcon.classList.toggle('active');
});

// Hide the menu when the X icon is clicked
closeIcon.addEventListener('click', () => {
  menu.classList.remove('show');
  hamburger.classList.remove('active');
  closeIcon.classList.remove('active');
});


