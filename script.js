// DOM elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let h2Elements = document.querySelectorAll('h2');
let themeSelector = document.querySelector('.dropdown-selector'); // Modified for custom dropdown
let dropdownMenu = document.querySelector('.dropdown-menu'); // Dropdown menu for themes

// Function to check if an element is in view
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Typewriter effect function
function typeWriter(element, text) {
    let index = 0;
    element.innerHTML = '';  // Clear the element before typing
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);  // Adjust typing speed
        }
    }
    type();
}

// Scroll event to activate link and type effect
window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });

            h2Elements.forEach(h2 => {
                if (isElementInView(h2) && !h2.dataset.typed) {
                    h2.dataset.typed = 'true';
                    typeWriter(h2, h2.textContent);
                }
            });
        }
    });
});

// Menu icon click event to toggle menu visibility
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Function to toggle dropdown visibility
function toggleDropdown() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to apply the selected theme
function applyTheme(theme) {
    const profileImage = document.querySelector('.home-img img');
    document.body.className = ''; // Remove all theme-specific classes

    switch(theme) {
        case 'theme-pink':
            document.body.classList.add('theme-3');
            profileImage.src = 'images/profile/pink.png';
            break;
        case 'theme-lavender':
            document.body.classList.add('theme-4');
            profileImage.src = 'images/profile/lavender.png';
            break;
        case 'theme-aqua':
            document.body.classList.add('theme-5');
            profileImage.src = 'images/profile/aqua.png';
            break;
        case 'theme-fire':
            document.body.classList.add('theme-6');
            profileImage.src = 'images/profile/fire.png';
            break;
        case 'theme-sunset':
            document.body.classList.add('theme-7');
            profileImage.src = 'images/profile/sunset.png';
            break;
        default:
            profileImage.src = 'images/profile/mono.png'; // Default image
    }
}

// Click event for the dropdown selector
themeSelector.addEventListener('click', toggleDropdown);

// Click events for each dropdown item
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        themeSelector.textContent = this.textContent; // Update the dropdown selector text
        applyTheme(this.getAttribute('data-value')); // Apply theme
        toggleDropdown(); // Close the dropdown
    });
});

// Click outside to close the dropdown
window.addEventListener('click', function(event) {
    if (!themeSelector.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Initialize EmailJS and handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("QZOJRKxe8bpIiTHPV"); // Replace this with your actual user ID

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_aig4iqe', 'template_el1ycff', this)
            .then(function() {
                alert('Your message has been sent successfully!');
                document.getElementById('contact-form').reset();
            }, function(error) {
                alert('Failed to send the message, please try again.');
            });
    });
});
