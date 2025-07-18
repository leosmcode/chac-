// Variáveis globais
let galleryImages = [];
let currentGalleryIndex = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeMenu()
  initializeForm()
  initializeScrollEffects()
  
  // Inicializar galeria para lightbox
  galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
  
  // Adicionar evento para abrir lightbox com índice correto
  document.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.onclick = function() {
      openLightboxGallery(idx);
    };
  });
})

// Menu Mobile
function initializeMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const navMobile = document.getElementById("navMobile")
  const navLinks = document.querySelectorAll(".nav-link")

  if (menuToggle && navMobile) {
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
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const sectionId = link.getAttribute("href").substring(1)
      scrollToSection(sectionId)
      
      // Fechar menu mobile se estiver aberto
      if (navMobile && navMobile.classList.contains("active")) {
        navMobile.classList.remove("active")
        const icon = menuToggle.querySelector("i")
        icon.className = "fas fa-bars"
        menuToggle.style.transform = "rotate(0deg)"
      }
    })
  })
}

// Formulário de Contato
function initializeForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const evento = document.getElementById('evento').value;
    const dataDesejada = document.getElementById('dataDesejada').value;
    const hospedes = document.getElementById('hospedes').value;
    const mensagem = document.getElementById('mensagem').value;

    let texto = `Olá! Gostaria de fazer um orçamento na chácara.\n`;
    texto += `*Nome:* ${nome}\n`;
    texto += `*Telefone:* ${telefone}\n`;
    texto += `*Tipo de Evento:* ${evento}\n`;
    texto += `*Data Desejada:* ${dataDesejada}\n`;
    if (hospedes) texto += `*Número de hóspedes:* ${hospedes}\n`;
    if (mensagem) texto += `*Mensagem:* ${mensagem}`;

    const url = `https://wa.me/554784619452?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
      successMessage.style.display = 'flex';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }
  });
}

// Efeitos de Scroll
function initializeScrollEffects() {
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

  // Parallax effect for hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Navegação suave
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// Lightbox Functions
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

// Event Listeners adicionais
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox()
  }
  
  // Navegação por teclado no lightbox
  if (document.getElementById("lightbox").style.display === "flex") {
    if (e.key === "ArrowLeft") {
      prevLightboxImage()
    } else if (e.key === "ArrowRight") {
      nextLightboxImage()
    }
  }
})

// Smooth hover effects
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Expansão da galeria por cômodos
const expandGalleryBtn = document.getElementById('expandGalleryBtn');
const galleryCategorias = document.getElementById('galleryCategorias');
const galleryResumo = document.getElementById('galleryResumo');
if (expandGalleryBtn && galleryCategorias && galleryResumo) {
  expandGalleryBtn.addEventListener('click', function() {
    if (galleryCategorias.style.display === 'none' || galleryCategorias.style.display === '') {
      galleryCategorias.style.display = 'block';
      galleryResumo.style.display = 'none';
      expandGalleryBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos fotos';
    } else {
      galleryCategorias.style.display = 'none';
      galleryResumo.style.display = 'grid';
      expandGalleryBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver galeria completa por cômodos';
    }
  });
}

