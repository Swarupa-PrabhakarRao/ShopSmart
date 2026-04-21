document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});

function updateNavbar() {
    const authLinks = document.getElementById('auth-links');
    const userLinks = document.getElementById('user-links');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token) {
        if(authLinks) authLinks.classList.add('hidden');
        if(userLinks) {
            userLinks.classList.remove('hidden');
            // Update profile dropdown if exists
            const pName = document.getElementById('profile-name');
            const pEmail = document.getElementById('profile-email');
            const pInitials = document.getElementById('profile-initials');
            
            if (pName && user) pName.textContent = user.name;
            if (pEmail && user) pEmail.textContent = user.email;
            if (pInitials && user) {
                pInitials.textContent = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            }
        }
    } else {
        if(authLinks) authLinks.classList.remove('hidden');
        if(userLinks) userLinks.classList.add('hidden');
    }
}

function toggleProfileDropdown(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
