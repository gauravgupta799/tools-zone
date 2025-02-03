const html = document.querySelector("html");
const body = document.querySelector(".body");
const header = document.querySelector(".header");


//====== Registerd ScrollTrigger Plugin ==========
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  $(".loader__wrapper-one").addClass("active");
});

//========= Lenis Start =========
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  infinite: false,
  syncTouch:false,
  smooth: true,
  smoothTouch: false,
});

function raf(time){
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= Lenis End =========

let isOpened = false;
function stopLenisScroll(){
  isOpened = !isOpened;
  isOpened ?  lenis.stop() : lenis.start() 
}

//========= Hide the Navbar when scrolling down start =========
let prevScrollPos = lenis.scroll;
function checkScroll(){
  let scrollTop = lenis.scroll || document.documentElement.scrollTop;
  if(prevScrollPos < scrollTop){
    header.classList.remove("sticky");
    header.classList.add("hidden");
  }else{
    scrollTop === 0 ?  header.classList.remove("sticky") : header.classList.add("sticky");
    header.classList.remove("hidden");
  }
  prevScrollPos = scrollTop <= 0 ? 0 : scrollTop;
}
//========= Hide the Navbar when scrolling down end =========


//====== Toggle Mobile Menu Start ==========
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);
const footerLinks = document.querySelectorAll(".footer__link");
const footerLinksArr = Array.from(footerLinks);
const overlay = document.querySelector(".overlay");

const hamburgerBtn = document.querySelector("#hamburger-btn")
hamburgerBtn && hamburgerBtn.addEventListener('click', () => {
  gsap.fromTo(".mobile-menu", 
    {
      opacity:0,
      x:"-100%",
    },{
      opacity:1,
      x:0,
      duration:0.2,
      ease:"power4.inOut"
    }
  );
  overlay.classList.add("active");
  const tl = gsap.timeline();
  mobileMenuLinksArr.forEach((mobileLink)=>{
      gsap.fromTo(mobileLink,
        {
            opacity:0,
            y:60,
            ease:"power3.inOut"
        },{
            opacity:1,
            y:0,
            duration:1.2,
            stagger:0.5,
            ease:"power3.inOut"
        }
      );
  });

  tl.from(".footer__link-title", 0.86,{
      opacity:0,
      y:50,
      delay:-0.2,
      ease: "power4.inOut",
    },
  )
  
  footerLinksArr.forEach((footerLink)=>{
      gsap.fromTo(footerLink,
          {
              opacity:0,
              y:60,
              ease:"power3.inOut"
          },{
              opacity:1,
              y:0,
              duration:1.2,
              stagger:0.5,
              delay:0.2,
              ease:"power3.inOut"
          }
      );
  });

  tl.fromTo(".socials-item", 
    {
      opacity:0,
      x:-100,
    },{
      opacity:1,
      x:0,
      stagger:0.1,
      delay:0.25,
      duration:1,
      ease: "power3.inOut",
    }
  )

  stopLenisScroll();
});

const closeMenuBtn = document.querySelector("#close-menu-btn");
closeMenuBtn && closeMenuBtn.addEventListener("click", function(){
    overlay.classList.remove("active");
    gsap.fromTo(".caret-down-icon",
      {
          opacity:1,
          y:0,
      },
      {
          opacity:0,
          y:100,
          duration:1,
          stagger:0.15,
          ease:"power4.inOut"
      },
    )

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
          {
              opacity:1,
              y:0,  
          },{
              opacity:0,
              y:60,
              duration:1,
              stagger:0.5,
              ease:"power3.inOut"
          }
        )
    });

    gsap.fromTo(".mobile-menu", 
      {
          opacity:1,
          x:0,  
      },{
          opacity:0,
          x:"-100%",
          duration:0.2,
          ease:"power4.inOut"
      }
    );

    stopLenisScroll();  
  }
);
//======= Toggle Menu ENd =============


// ---------- Mobile SubMenu Start --------
const mobileSubmenu = document.querySelectorAll(".mobile-submenu");
mobileSubmenu && mobileSubmenu.forEach((submenu)=>{
  submenu.addEventListener("click", function(){
      const menu = submenu.querySelector(".subMenu__list--mobile");
      submenu.classList.toggle("active");
      let content = menu;
      if (content) {
          content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
      }

      mobileSubmenu.forEach((acdnItem)=>{
          if(acdnItem !== submenu){
              acdnItem.classList.remove("active");
              acdnItem.querySelector(".subMenu__list--mobile").style.maxHeight = null;
          }
      })
  })
});
// ---------- Mobile SubMenu End --------

// ======== Accordian Start =======
function toggleAccordian(element){
  element.classList.toggle("isOpened");
  let content = element.nextElementSibling;
  content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;

}
const accordians = document.querySelectorAll(".accordian");
accordians && accordians.forEach((accord)=>{
  accord.addEventListener("click",(e)=>{
    e.stopPropagation();
    toggleAccordian(accord);

    accordians.forEach((accrd)=>{
      if(accrd !== accord){
        accrd.classList.remove("isOpened");
        accrd.nextElementSibling.style.maxHeight = null;
      }
    });

  });
});
// ======== Accordian End =======


//==== Toggle The Filter Card Start =======
const filterToggle = document.querySelector(".accordian-filter");
let filterContainer;
filterToggle && filterToggle.addEventListener("click", function(e){
  e.stopPropagation();
  filterContainer = this.nextElementSibling;
  filterContainer.classList.toggle("isActive");
});

//==== Toggle The Filter Card End =======

body.addEventListener("click", function(event){
  // Check if the clicked element is not the button or the card
  if(filterContainer){
    if(!filterToggle.contains(event.target) && !filterContainer.contains(event.target)) {
      filterContainer.classList.remove("isActive")
    }
  }
});


// const swiperDefaultValues = {
//   loop: true,
//   speed: 1000,
//   autoplay: true,
//   slidesPerView:1,
//   delay:1500,
// }


// ====== Swiper
const heroSwiper = new Swiper(".swiper-hero", {
  loop: true,
  speed: 1000,
  autoplay: true,
  slidesPerView:1,
  delay:1500,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

const supportSwiper = new Swiper(".swiper-support", {
  loop: true,
  speed: 1000,
  autoplay: true,
  slidesPerView:1,
  delay:1500,
  breakpoints: {
    576:{
      slidesPerView:2,
    },
    768:{
      slidesPerView:3,
    },
  }
});

// const BrandsSwiper = new Swiper(".swiper-brands", {
//   spaceBetween:30,
//   loop:true,
//   speed:12000,
//   slidesPerView:"auto",
//   freeMode:true,
//   autoplay: {
//     delay: 0,
//     disableOnInteraction: false, // Keep autoplay even after user interaction
//   },
//   freeModeMomentum: false, // Disable momentum to keep a constant scroll
// });

const testimonailSwiper = new Swiper(".swiper-testimonial", {
  loop:true,
  speed: 1000,
  autoplay:true,
  slidesPerView:1,
  delay:1500,
  spaceBetween: 20,
  pagination: {
    el:".swiper-pagination",
    dynamicBullets: true, 
  },
  breakpoints: {
    576:{
      slidesPerView:2,
    },
    768:{
      slidesPerView:3,
    },
    1680:{
      slidesPerView:4,
    }
  }
});

const productSwiper = new Swiper(".swiper-prdct-container", {
  slidesPerView:1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576:{
      slidesPerView:2,
    },
    768:{
      slidesPerView:3,
    },
    1400:{
      slidesPerView:4,
    }
  }
});


// animation on text container
const textContainers = gsap.utils.toArray(".fade-in-up");
textContainers.forEach((textContainer, i) => {
  const anim = gsap.fromTo(
    textContainer,
    { opacity: 0, y: 50 },
    { duration: 1, opacity: 1, y: 0 }
  );
  ScrollTrigger.create({
    trigger: textContainer,
    animation: anim,
    toggleActions: "play",
    once: true,
    // scroller:".main",
    duration: 1,
    stagger:0.2,
    ease: Power4.easeOut,
  });
});

// animation of fade in for hero part
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
  const anim = gsap.fromTo(
    mainContent,
    { opacity: 0 },
    { opacity: 1, duration: 1}
  );
  ScrollTrigger.create({
    trigger: mainContent,
    animation: anim,
    toggleActions: "play",
    once: true,
    // scroller:".main",
    duration: 1,
    ease: Power4.easeOut,
  });
});

// animation on image container
const imagesScale = gsap.utils.toArray(".scaleY");
imagesScale.forEach((imgContainer, i) => {
  const anim = gsap.fromTo(
    imgContainer,
    { opacity: 0, y: 50, scale:0.95, transformOrigin:"bottom"},
    { opacity: 1, y: 0, scale:1.0035, duration:1 }
  );
  ScrollTrigger.create({
    trigger:imgContainer,
    animation: anim,
    toggleActions: "play",
    once: true,
    // scroller:".main",
    duration: 1,
    stagger:0.1,
    ease: Power4.easeOut,
  });
});



// Update ScrollTrigger when Lenis scroll event occurs
lenis.on('scroll', (e) => {
  checkScroll();
  ScrollTrigger.update();
});

gsap.ticker.lagSmoothing(0);

window.addEventListener("load",()=>{
  $(".loader").addClass("end");
});
//=========== Filter Portfolio End =============