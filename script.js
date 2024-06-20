let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let h2Elements = document.querySelectorAll('h2');
let themeSelector = document.querySelector('#theme-selector'); // Access the theme selector

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function typeWriter(element, text) {
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed
        }
    }
    type();
}

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });

            h2Elements.forEach(h2 => {
                if (isElementInView(h2) && !h2.dataset.typed) {
                    h2.dataset.typed = 'true'; // Prevent re-typing on the same element
                    typeWriter(h2, h2.textContent);
                }
            });
        }
    });
});

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Theme selector change event listener
themeSelector.addEventListener('change', function() {
    // Remove all theme classes first to avoid conflicts
    document.body.classList.remove('theme-3', 'theme-4', 'theme-5', 'theme-6', 'theme-7');

    // Add the selected theme class to the body
    switch (this.value) {
        case 'theme-pink':
            document.body.classList.add('theme-3');
            break;
        case 'theme-lavender':
            document.body.classList.add('theme-4');
            break;
        case 'theme-aqua':
            document.body.classList.add('theme-5');
            break;
        case 'theme-fire':
            document.body.classList.add('theme-6');
            break;
        case 'theme-sunset':
            document.body.classList.add('theme-7');
            break;
        default:
            // Remove all themes if 'default' is selected
            break;
    }
});
// Function to change image based on the theme
function changeProfileImage(theme) {
    const profileImage = document.querySelector('.home-img img');
    switch (theme) {
        case 'theme-pink':
            profileImage.src = 'images/profile/pink.png';
            break;
        case 'theme-lavender':
            profileImage.src = 'images/profile/lavender.png';
            break;
        case 'theme-aqua':
            profileImage.src = 'images/profile/aqua.png';
            break;
        case 'theme-fire':
            profileImage.src = 'images/profile/fire.png';
            break;
        case 'theme-sunset':
            profileImage.src = 'images/profile/sunset.png';
            break;
        default:
            profileImage.src = 'images/profile/mono.png';
            break;
    }
}

// Attach this function to the theme selector change event
themeSelector.addEventListener('change', function() {
    document.body.className = '';
    const value = this.value;
    changeProfileImage(value);
    document.body.classList.add(value);
});


document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("QZOJRKxe8bpIiTHPV");

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Sending the form data to EmailJS
        emailjs.sendForm('service_aig4iqe', 'template_el1ycff', this)
        .then(function() {
            console.log('SUCCESS!');
            alert('Your message has been sent successfully!');
            // Optionally reset the form here
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send the message, please try again.');
        });
    });
});
