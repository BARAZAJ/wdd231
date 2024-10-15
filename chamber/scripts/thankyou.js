// Function to display the current year and last modified date
function displayFooterInfo() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = document.lastModified;
}

// Run on page load
displayFooterInfo();




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
    <h3>We have received your application. Thank you!</h3>
    <p>First name: ${show("first-name")}</p>
    <p>Last name: ${show("last-name")}</p>
    <p>Organizational title: ${show("org-title")}</p>
    <p>Email: ${show("email")}</p>
    <p>Tel: ${show("mobile")}</p>
    <p>Business name: ${show("org-name")}</p>
    <p>Membership level: ${show("membership-level")}</p>
`;






   

// Populate thank you page with form data from URL
