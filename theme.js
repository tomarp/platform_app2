// This script handles the light/dark theme functionality.

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on page load
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        // Update the button icon if it's dark mode
        if (currentTheme === 'dark-theme') {
            themeToggleButton.innerHTML = '☀️'; // Sun icon for dark mode
        }
    }

    // Add click event to the toggle button
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        let theme = 'light-theme';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
            themeToggleButton.innerHTML = '☀️'; // Change to sun icon
        } else {
            themeToggleButton.innerHTML = '🌙'; // Change to moon icon
        }
        // Save the user's preference
        localStorage.setItem('theme', theme);
    });
});
