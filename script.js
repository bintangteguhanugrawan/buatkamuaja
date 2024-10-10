// script.js

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  });
  
  // Inisialisasi AOS
  AOS.init({
    duration: 1000,
    once: true
  });
  
  // Sticky Header dan Back to Top Button
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
  
    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  
    // Animate Progress Bars
    const skillsSection = document.getElementById('skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
  
    if (skillsPosition < screenPosition) {
      document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('style').split(': ')[1];
      });
    }
  });
  
  // Smooth Scrolling
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Back to Top Functionality
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Toggle icon
    themeToggle.innerHTML = document.body.classList.contains('dark') ?
      '<i class="fas fa-sun"></i>' :
      '<i class="fas fa-moon"></i>';
    
    // Persistensi Dark Mode
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Memuat tema berdasarkan preferensi sebelumnya
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  
    // Initialize Typed.js for Animated Text (Optional)
    const typed = new Typed('.hero-content p', {
      strings: ['Selamat datang di website portfolio pribadi saya'],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false
    });
  });
  
  // Form Validation for Contact Form
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (name === '' || email === '' || message === '') {
      alert('Harap isi semua bidang.');
      return;
    }
  
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Harap masukkan alamat email yang valid.');
      return;
    }
  
    // Validasi reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      alert('Harap verifikasi reCAPTCHA.');
      return;
    }
  
    // Di sini Anda bisa menambahkan AJAX untuk mengirim data ke server
  
    alert('Terima kasih atas pesan Anda!');
    contactForm.reset();
    grecaptcha.reset();
  });
  
  // Form Validation for Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('newsletter-email').value.trim();
  
    if (email === '') {
      alert('Harap masukkan alamat email Anda.');
      return;
    }
  
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Harap masukkan alamat email yang valid.');
      return;
    }
  
    // Di sini Anda bisa menambahkan AJAX untuk mengirim email ke layanan newsletter
  
    alert('Terima kasih telah berlangganan!');
    newsletterForm.reset();
  });
  
  // Testimonials Carousel dengan Slick Carousel
  $(document).ready(function(){
    $('.testimonials-carousel').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false
    });
  });
  
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const answer = item.querySelector('p');
      if (item.classList.contains('active')) {
        answer.style.display = 'block';
      } else {
        answer.style.display = 'none';
      }
    });
  });
  
  // GitHub Repositories Integration
  const githubUsername = 'your-github-username'; // Ganti dengan username GitHub Anda
  const githubReposContainer = document.getElementById('github-repos');
  
  fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('github-repo-card');
        
        repoCard.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description available.'}</p>
          <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        
        githubReposContainer.appendChild(repoCard);
      });
    })
    .catch(error => {
      console.error('Error fetching GitHub repositories:', error);
      githubReposContainer.innerHTML = '<p>Unable to load repositories at this time.</p>';
    });
  
  // Inisialisasi Particles.js untuk Animated Background
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded - callback');
  });
  
  // Inisialisasi Lottie Animation (Optional)
  const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // ID dari elemen kontainer
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/example-animation.json' // Path ke file animasi JSON
  });
  
  // Scroll-Based Animations dengan GSAP (Optional)
  gsap.from('.skills-grid', { 
    scrollTrigger: '.skills-grid',
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2
  });
  
  gsap.from('.projects-grid .project-card', { 
    scrollTrigger: '.projects-grid',
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2
  });
  
  // Smooth Section Transitions dengan GSAP (Optional)
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
  });
  