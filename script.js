let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let h2Elements = document.querySelectorAll('h2');
let themeSelector = document.querySelector('#theme-selector'); // Access the theme selector
let profileImage = document.querySelector('.home-img img'); // Access the profile image element

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
                document.querySelector(`header nav a[href*="${id}"]`)?.classList.add('active');
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

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

themeSelector.addEventListener('change', function() {
    let themeValue = this.value;
    // Remove all theme-specific classes
    document.body.classList.remove('theme-3', 'theme-4', 'theme-5', 'theme-6', 'theme-7');
    
    // Apply new theme class and update profile image
    switch(themeValue) {
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
            break;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("QZOJRKxe8bpIiTHPV");

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
