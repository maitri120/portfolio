// script.js
document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-link');
    const backLinks = document.querySelectorAll('.back-link');
    const flipCardInner = document.querySelector('.flip-card-inner');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.dataset.project;
            document.querySelectorAll('.project-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(projectId).style.display = 'block';
            flipCardInner.classList.add('flip');
        });
    });

    backLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            flipCardInner.classList.remove('flip');
        });
    });
});
