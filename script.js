// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    const skillsContainer = document.getElementById('skills');

    data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Technologies: ${project.technologies.join(', ')}</p>
        `;
        projectsContainer.appendChild(projectElement);
    });

    Object.entries(data.skills).forEach(([category, skills]) => {
        const skillCategoryElement = document.createElement('div');
        skillCategoryElement.classList.add('skill-category');
        skillCategoryElement.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <p>${skills.join(', ')}</p>
        `;
        skillsContainer.appendChild(skillCategoryElement);
    });
});

// script.js
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('All fields are required!');
        return;
    }

    // Add more validation as needed

    alert('Form submitted successfully!');
});


// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


