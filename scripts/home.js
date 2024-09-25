const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized computer programmers.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior web fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function renderCourses(filteredCourses) {
    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = ''; // Clear previous content

    filteredCourses.forEach(course => {
        // Create course card
        const card = document.createElement('div'); 
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed'); // Apply 'completed' style for completed courses
        }
        card.innerHTML = `${course.subject} ${course.number}`;

        courseContainer.appendChild(card);
    });

    // Calculate total credits dynamically
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    document.getElementById('total-credits').innerHTML = `Total Credits: ${totalCredits}`;
}

// Initial render with all courses
renderCourses(courses);

// Filter courses based on the button clicked
function filterCourses(subject) {
    if (subject === 'all') {
        renderCourses(courses);
    } else {
        const filteredCourses = courses.filter(course => course.subject === subject);
        renderCourses(filteredCourses);
    }
}

const lastModifiedDate = document.lastModified;
    
    // Display it in the footer
    document.getElementById('last-modified').textContent = lastModifiedDate;

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
    
// Get the current year
const currentYear = new Date().getFullYear();

// Define the interesting symbol
const symbol = "©";

// Populate the footer with the symbol before the current year
document.getElementById("footer-year").textContent = `${symbol} ${currentYear}`;


















