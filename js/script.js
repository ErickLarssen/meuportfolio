/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


/*========== sticky navbar ==========*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


/*========== remove menu icon navbar when click navbar link (scroll) ==========*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};


/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

/*========== scroll reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

// PORTFOLIO GALLARY TAB

function open_img(evt, cityName){
    let i, tabcontent, tablinks;

    // hide all tab content
    tabcontent = document.getElementsByClassName('tabcontent');
    for(i = 0 ; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    // remove active class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0 ; i < tablinks.length; i++){
        tablinks[i].classList.remove("active");
    }

    // show the selected tab content and mark the corresponding tab link as active
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add('active');
}

// PORTFOLIO PAGES
// Função para abrir a imagem de acordo com o clique na aba
function open_img(evt, id) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(id).style.display = "block";
    evt.target.className += " active";
}

// Adiciona lógica para abrir a seção correta ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash; // Pega o fragmento da URL, como #ui_ux
    if (hash) {
        // Chama a função de abrir a aba correspondente
        const tablink = document.querySelector(`button[onclick="open_img(event, '${hash.substring(1)}')"]`);
        if (tablink) {
            tablink.click(); // Simula o clique no botão da aba
        }
    }
});

