// Variáveis globais
let currentSlideIndex = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
let isLoading = true
let mouseX = 0
let mouseY = 0

// Variáveis globais para lightbox da galeria
let galleryImages = [];
let currentGalleryIndex = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeLoadingScreen()
  initializeSlideshow()
  initializeMenu()
  initializeForm()
  initializeCustomCursor()
  initializeScrollProgress()
  initializeTypewriter()
  initializeCounters()
  initializeParticles()
  initializeTiltEffect()
  initializeParallax()
  initializeMagneticEffect()
  initializeRippleEffect()
  // Inicializar galeria para lightbox
  galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
  // Adicionar evento para abrir lightbox com índice correto
  document.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.onclick = function() {
      openLightboxGallery(idx);
    };
  });
})

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")

  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      isLoading = false
      // Inicia animações após loading
      // startRevealAnimations() // REMOVIDO
    }, 500)
  }, 3000)
}

// Custom Cursor
function initializeCustomCursor() {
  const cursor = document.querySelector(".custom-cursor")
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursorDot.style.left = e.clientX + "px"
    cursorDot.style.top = e.clientY + "px"

    cursorOutline.style.left = e.clientX + "px"
    cursorOutline.style.top = e.clientY + "px"
  })

  // Efeitos em elementos interativos
  document.querySelectorAll("a, button, .gallery-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(2)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    })
  })
}

// Scroll Progress Bar
function initializeScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress-bar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    progressBar.style.width = scrollPercent + "%"
  })
}

// Typewriter Effect
function initializeTypewriter() {
  const typewriter = document.getElementById("typewriter")
  const texts = [
    "O espaço ideal para o seu grande dia",
    "Eventos inesquecíveis",
    "Eventos corporativos de sucesso",
    "Aniversários especiais",
    "Festas memoráveis",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typewriter.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typewriter.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Animated Counters
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Inicia contadores quando visíveis
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => counterObserver.observe(counter))
}

// Particles Background
function initializeParticles() {
  // Simulação simples de partículas
  const particlesContainer = document.getElementById("particles-js")

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = "2px"
    particle.style.height = "2px"
    particle.style.background = "#059669"
    particle.style.borderRadius = "50%"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`
    particle.style.animationDelay = Math.random() * 2 + "s"

    particlesContainer.appendChild(particle)
  }
}

// Tilt Effect
function initializeTiltEffect() {
  const tiltElements = document.querySelectorAll(".card, .structure-card, .testimonial-card")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
    })
  })
}

// Parallax Effect
function initializeParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".parallax")

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// Magnetic Effect
function initializeMagneticEffect() {
  const magneticElements = document.querySelectorAll(".magnetic")

  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)"
    })
  })
}

// Ripple Effect
function initializeRippleEffect() {
  document.querySelectorAll(".btn").forEach((button) => {
    button.classList.add("ripple")
  })
}

// Toast Notifications
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer")
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icon = type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"

  toast.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span>${message}</span>
  `

  toastContainer.appendChild(toast)

  setTimeout(() => toast.classList.add("show"), 100)

  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// Enhanced Reveal Animations
function startRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    { threshold: 0.1 },
  )

  revealElements.forEach((element) => revealObserver.observe(element))
}

// Enhanced Slideshow
function initializeSlideshow() {
  // Auto-play do slideshow
  setInterval(() => {
    nextSlide()
  }, 5000)

  // Touch/Swipe support
  let startX = 0
  let endX = 0

  const heroSection = document.querySelector(".hero")

  heroSection.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
  })

  heroSection.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    handleSwipe()
  })

  function handleSwipe() {
    const threshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }
}

function prevSlide() {
  showSlide((currentSlideIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : slides.length - 1))
}

function currentSlide(n) {
  showSlide((currentSlideIndex = n - 1))
}

function nextSlide() {
  showSlide((currentSlideIndex = (currentSlideIndex + 1) % slides.length))
}

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  if (slides[n]) {
    slides[n].classList.add("active")
  }
  if (dots[n]) {
    dots[n].classList.add("active")
  }
}

// Enhanced Menu
function initializeMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const navMobile = document.getElementById("navMobile")
  const navLinks = document.querySelectorAll(".nav-link")

  menuToggle.addEventListener("click", () => {
    navMobile.classList.toggle("active")
    const icon = menuToggle.querySelector("i")

    if (navMobile.classList.contains("active")) {
      icon.className = "fas fa-times"
      menuToggle.style.transform = "rotate(180deg)"
    } else {
      icon.className = "fas fa-bars"
      menuToggle.style.transform = "rotate(0deg)"
    }
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("active")
      const icon = menuToggle.querySelector("i")
      icon.className = "fas fa-bars"
      menuToggle.style.transform = "rotate(0deg)"
    })
  })
}

// Enhanced Form
function initializeForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const tipoEvento = document.getElementById('tipoEvento').value;
    const data = document.getElementById('data').value;
    const mensagem = document.getElementById('mensagem').value;
    let texto = `Olá! Gostaria de solicitar um orçamento.\n`;
    texto += `*Nome:* ${nome}\n`;
    texto += `*Telefone:* ${telefone}\n`;
    texto += `*Tipo de evento:* ${tipoEvento}\n`;
    if (data) texto += `*Data pretendida:* ${data}\n`;
    texto += `*Mensagem:* ${mensagem}`;
    const url = `https://wa.me/554784619452?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
}

// Navegação suave aprimorada
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    // Smooth scroll com easing personalizado
    const startPosition = window.pageYOffset
    const distance = elementPosition - startPosition
    const duration = 1000
    let start = null

    function animation(currentTime) {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }
}

// Enhanced Lightbox
function openLightbox(imageSrc) {
  const idx = galleryImages.indexOf(imageSrc);
  if (idx !== -1) {
    openLightboxGallery(idx);
  } else {
    // fallback
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    lightboxImage.src = imageSrc;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.style.opacity = "1";
    }, 10);
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  lightbox.style.opacity = "0"
  setTimeout(() => {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

function openLightboxGallery(index) {
  currentGalleryIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  lightboxImage.src = galleryImages[currentGalleryIndex];
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
  lightbox.style.opacity = "0";
  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 10);
}

function prevLightboxImage() {
  if (galleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("lightboxImage").src = galleryImages[currentGalleryIndex];
}

function nextLightboxImage() {
  if (galleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  document.getElementById("lightboxImage").src = galleryImages[currentGalleryIndex];
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Event Listeners adicionais
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox()
  }

  // Navegação por teclado no slideshow
  if (e.key === "ArrowLeft") {
    prevSlide()
  } else if (e.key === "ArrowRight") {
    nextSlide()
  }
})

// Header effect on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.backdropFilter = "blur(20px)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  }
})

// Adiciona classes para animações
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const sectionId = this.getAttribute("href").substring(1)
    scrollToSection(sectionId)
  })
})

// Performance optimization
let ticking = false

function updateAnimations() {
  // Atualiza animações baseadas em scroll
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})

function toggleGalleryExpand() {
  const gallery = document.querySelector('.gallery-grid');
  const btn = document.querySelector('.gallery-expand-btn');
  if (gallery.classList.contains('gallery-collapsed')) {
    gallery.classList.remove('gallery-collapsed');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  } else {
    gallery.classList.add('gallery-collapsed');
    btn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    gallery.scrollIntoView({behavior: 'smooth'});
  }
}
