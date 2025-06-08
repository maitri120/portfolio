document.addEventListener('DOMContentLoaded', () => {
    
    showProjectsOnReturn();
    
    // Category filtering functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projectsGrid');
    const sectionTitle = document.getElementById('sectionTitle');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            
            projectsGrid.classList.remove('hidden');
            sectionTitle.classList.remove('hidden');
            
            
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

            
            sectionTitle.scrollIntoView({ behavior: 'smooth' });
        });
    });

    
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

    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Function to handle returning from project pages
function showProjectsOnReturn() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const showProjects = urlParams.get('show');
    
    if (showProjects === 'projects') {
        
        const projectsGrid = document.getElementById('projectsGrid');
        const sectionTitle = document.getElementById('sectionTitle');
        
        if (projectsGrid && sectionTitle) {
            projectsGrid.classList.remove('hidden');
            sectionTitle.classList.remove('hidden');
            sectionTitle.textContent = 'All Projects';
            
            
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.display = 'block';
            });
            
            
            setTimeout(() => {
                sectionTitle.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}
