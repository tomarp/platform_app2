// This script handles the light/dark theme functionality.

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Function to apply the theme and update the button icon
    function applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme);
        if (theme === 'dark-theme') {
            themeToggleButton.innerHTML = '☀️'; // Sun icon for dark mode
        } else {
            themeToggleButton.innerHTML = '🌙'; // Moon icon for light mode
        }
        localStorage.setItem('theme', theme);
    }

    // Apply the saved theme on page load, or default to light-theme
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        applyTheme('dark-theme');
    }

    // Add click event to the toggle button
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        applyTheme(newTheme);
    });
});