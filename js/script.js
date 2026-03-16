// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animation Observer First
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Function to observe elements
    const observeElements = () => {
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    };

    // Initial observation for static elements
    observeElements();

    // 2. Load Navbar
    fetch('components/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            const container = document.getElementById('navbar-container');
            if (container) {
                container.innerHTML = html;
                
                // Set active class based on current page
                setupActiveLinks();
                
                // Crucial: Observe dynamically added navbar elements
                const dynamicNav = container.querySelector('.fade-in');
                if (dynamicNav) observer.observe(dynamicNav);
            }
        })
        .catch(error => {
            console.warn('Navbar fetch failed (likely due to local CORS). Please serve via Live Server.', error);
            const container = document.getElementById('navbar-container');
            if (container) {
                container.innerHTML = `
                    <nav class="navbar fade-in">
                        <ul class="nav-links">
                            <li><a href="index.html" class="nav-link">Home</a></li>
                            <li><a href="about.html" class="nav-link">About</a></li>
                            <li><a href="resume.html" class="nav-link">Resume</a></li>
                            <li><a href="projects.html" class="nav-link">Portofolio</a></li>
                        </ul>
                        <div class="nav-contact">
                            <i class="fa-solid fa-mobile-screen"></i> +62 895-2280-9056
                        </div>
                    </nav>
                `;
                setupActiveLinks();
                const dynamicNav = container.querySelector('.fade-in');
                if (dynamicNav) observer.observe(dynamicNav);
            }
        });

    // 3. Load Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => {
                if (response.ok) return response.text();
                return null;
            })
            .then(html => {
                if (html) {
                    footerContainer.innerHTML = html;
                    // Observe dynamically added footer elements
                    const dynamicFooter = footerContainer.querySelector('.fade-in');
                    if (dynamicFooter) observer.observe(dynamicFooter);
                }
            })
            .catch(error => console.warn('Footer fetch failed', error));
    }
});

function setupActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
