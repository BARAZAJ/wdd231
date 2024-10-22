const daysElement = document.getElementById('days');
const monthYearElement = document.getElementById('month-year');
let currentDate = new Date();

function displayCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPreviousMonth = new Date(year, month, 0).getDate();

    // Clear the previous days
    daysElement.innerHTML = '';

    // Update the month and year title
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    // Display the days of the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.textContent = lastDateOfPreviousMonth - i + 1;
        dayElement.classList.add('prev-month');
        daysElement.appendChild(dayElement);
    }

    // Display the current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        daysElement.appendChild(dayElement);
    }

    // Fill the rest of the grid with the next month's days
    const totalDays = firstDayOfMonth + lastDateOfMonth;
    const extraDays = 7 - (totalDays % 7);
    if (extraDays < 7) {
        for (let i = 1; i <= extraDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.classList.add('next-month');
            daysElement.appendChild(dayElement);
        }
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    displayCalendar(currentDate);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    displayCalendar(currentDate);
});

// Initial display of the current month
displayCalendar(currentDate);

 // Function to display the appropriate message
 function displayVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const now = Date.now(); // Current timestamp in milliseconds
    const oneMinute = 1000 * 60; // Milliseconds in one minute
    const oneHour = oneMinute * 60; // Milliseconds in one hour
    const oneDay = oneHour * 24; // Milliseconds in one day

    // Retrieve last visit time from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
        // Calculate the time difference between now and the last visit
        const timeDifference = now - parseInt(lastVisit);

        // Calculate days, hours, and minutes between visits
        const daysBetween = Math.floor(timeDifference / oneDay);
        const hoursBetween = Math.floor((timeDifference % oneDay) / oneHour);
        const minutesBetween = Math.floor((timeDifference % oneHour) / oneMinute);

        // Display appropriate message based on time difference
        if (daysBetween === 0 && hoursBetween === 0 && minutesBetween < 60) {
            visitMessage.textContent = `Back so soon! You last visited ${minutesBetween} minute(s) ago.`;
        } else if (daysBetween === 0 && hoursBetween > 0) {
            visitMessage.textContent = `You last visited ${hoursBetween} hour(s) and ${minutesBetween} minute(s) ago.`;
        } else if (daysBetween === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        // If no previous visit is found
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }

    // Store the current visit date in localStorage
    localStorage.setItem('lastVisit', now);
}

// Call the function to display the message on page load
displayVisitMessage();

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


