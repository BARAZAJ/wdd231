async function fetchMembers() {
    console.log("Fetching members...");
    try {
        const response = await fetch('data/members.json'); // Adjust the path if necessary
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="${member.image_url}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <button class="about-btn" data-name="${member.name}" data-description="${member.description}">About</button>
        `;
        container.appendChild(card);
    });

    // Add event listeners to "About" buttons
    const aboutButtons = container.querySelectorAll('.about-btn');
    aboutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const description = button.getAttribute('data-description');
            const name = button.getAttribute('data-name');
            showDialog(name, description);
        });
    });
}

function showDialog(name, description) {
    const dialogBox = document.getElementById('dialogBox');
    const dialogName = document.getElementById('dialogName');
    const dialogDescription = document.getElementById('dialogDescription');
    const closeButton = document.getElementById('closeButton');

    dialogName.textContent = name;
    dialogDescription.textContent = description;

    dialogBox.showModal();

    closeButton.addEventListener('click', () => {
        dialogBox.close();
    });
}

window.onload = function() {
    fetchMembers();
};
