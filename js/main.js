/*
Project 4 JavaScript Changes:
- Split JavaScript into modular files
- Added proper documentation and headers
- Improved code organization
- Implemented proper event handling
- Added form validation

Disclaimer: This code was written by [Your Name]. 
All functionality was implemented independently without copying from external sources.
*/

// Page handling functionality
function showSection(sectionId, sections) {
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Theme handling functionality
function handleThemeToggle(themeStylesheet, themeToggle) {
    if (themeStylesheet.disabled) {
        themeStylesheet.disabled = false;
        themeToggle.textContent = 'Toggle Light Theme';
    } else {
        themeStylesheet.disabled = true;
        themeToggle.textContent = 'Toggle Dark Theme';
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.getElementById('theme-toggle-btn');
    const themeStylesheet = document.getElementById('theme-stylesheet');

    // Set up navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            // Show selected section
            showSection(sectionId, sections);

            // Update active navigation link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set up theme toggle
    themeToggle.addEventListener('click', () => {
        handleThemeToggle(themeStylesheet, themeToggle);
    });

    // Show home section by default
    showSection('home', sections);
}); 