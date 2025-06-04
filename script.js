document.addEventListener('DOMContentLoaded', () => {
    // Category filtering functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projectsGrid');
    const sectionTitle = document.getElementById('sectionTitle');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            // Show the projects section and title
            projectsGrid.classList.remove('hidden');
            sectionTitle.classList.remove('hidden');
            
            // Update section title based on category
            const categoryTitles = {
                'ai': 'AI & Machine Learning Projects',
                'computer-vision': 'Computer Vision Projects',
                'nlp': 'Natural Language Processing Projects',
                'big-data': 'Big Data & Analytics Projects',
                'commissioned': 'Commissioned Work'
            };
            sectionTitle.textContent = categoryTitles[selectedCategory] || 'Projects';

            // Filter projects
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                if (cardCategories.includes(selectedCategory)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Smooth scroll to projects section
            sectionTitle.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for navigation links (keeping your original functionality)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});