document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.getElementById('theme-toggle-btn');
    const themeStylesheet = document.getElementById('theme-stylesheet');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Show the home section by default
    showSection('home');

    themeToggle.addEventListener('click', function() {
        if (themeStylesheet.disabled) {
            themeStylesheet.disabled = false;
            themeToggle.textContent = 'Toggle Light Theme';
        } else {
            themeStylesheet.disabled = true;
            themeToggle.textContent = 'Toggle Dark Theme';
        }
    });
});
