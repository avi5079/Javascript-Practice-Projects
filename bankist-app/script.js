'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', event => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(btnScrollTo.getBoundingClientRect());
  // console.log(s1coords);
  // console.log(
  //   `btn: X: ${btnScrollTo.getBoundingClientRect().left} Y: ${
  //     btnScrollTo.getBoundingClientRect().y
  //   } top: ${btnScrollTo.getBoundingClientRect().top}`
  // );
  // console.log('X: ', s1coords.left, 'Y: ', s1coords.y, 'top: ', s1coords.top);
  // console.log('X: ', window.pageXOffset, 'Y: ', window.pageYOffset);
  // window.scrollTo(s1coords.left, s1coords.top);

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scroll({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     console.log('Link', event.target);
//     console.log(event);
//     this.style.backgroundColor = randomColor();
//   });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (event) {
//     console.log('Link2', event.target);
//     this.style.backgroundColor = randomColor();
//   });

// document.querySelector('.nav').addEventListener('click', function (event) {
//   console.log('Link3', event.target);
//   this.style.backgroundColor = randomColor();
// });

// setInterval(() => {
//   document.querySelector('.nav').style.backgroundColor = randomColor();
// }, 1000);

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

////////////////////////// event delegation for navBar links
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    e.preventDefault();
    const link = e.target.getAttribute('href');
    document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
  }
});
/////////////////////////////// tabs

// const tabs = document.querySelectorAll('.operations__tab');
// tabs.forEach(function (btn) {
//   btn.addEventListener('click', function (e) {
//     // console.log(this.dataset.tab);
//     // class name => 'operations__tab-active'
//     [...btn.parentNode.children].forEach(function (btn) {
//       if (btn !== e.target) {
//         if (btn.classList.contains('operations__tab--active'))
//           btn.classList.remove('operations__tab--active');
//       }
//     });
//     this.classList.add('operations__tab--active');
//     document
//       .querySelectorAll('.operations__content')
//       .forEach(function (content) {
//         if (content.classList.contains('operations__content--active')) {
//           content.classList.remove('operations__content--active');
//         }
//       });

//     document
//       .querySelector(`.operations__content--${this.dataset.tab}`)
//       .classList.add('operations__content--active');
//   });
// });

///////////////////////////// using event delegation
const tabC = document.querySelector('.operations__tab-container');
// console.log(tabC);

tabC.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  if (clicked.classList.contains('operations__tab')) {
    [...this.children].forEach(function (btn) {
      if (btn !== clicked) {
        if (btn.classList.contains('operations__tab--active'))
          btn.classList.remove('operations__tab--active');
      }
    });
    clicked.classList.add('operations__tab--active');

    //////// content
    document
      .querySelectorAll('.operations__content')
      .forEach(function (content) {
        if (content.classList.contains('operations__content--active')) {
          content.classList.remove('operations__content--active');
        }
      });
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

//////////////////////////////////// passing arguments to event handlers
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// passing argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////// sticky navigation

// bad performance will activate at the most little scroll
// window.addEventListener('scroll', function (e) {
//   // console.log(section1);
//   const initalCoords = section1.getBoundingClientRect();
//   const navBar = nav.getBoundingClientRect();
//   // console.log(initalCoords);
//   if (navBar.height > initalCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// setInterval(function () {
//   console.log(`${window.scrollY} ... ${window.pageYOffset}`);
// }, 2000);
// window.scrollY and window.pageYOffset are the same thing

///////////////////////// using Intersection Observer API
//allows us to observe an element changes based on how it intersects any other element or the view port

// const obsCallBack = function (entries, observer) {
//   // console.log(entries);
//   // console.log(observer);
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const oobsOptions = {
//   root: null,
//   threshold: 1,
// };

// const oobserver = new IntersectionObserver(obsCallBack, oobsOptions);
// oobserver.observe(section1);

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// const ratio = nav.getBoundingClientRect().height / header.getBoundingClientRect().height;
// console.log(ratio);

const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

/////////////////////////////////////////////////////////// revealing elements on scroll
const revealling = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const Options = {
  root: null,
  threshold: 0.15,
};

const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealling, Options);
allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////////////////// Lazy loading images
const lazyImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // entry.target.classList.remove('lazy-img');
  // we cannot do that or before loading the high resolution img, the blur filter will be removed
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function (e) {
    this.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const images = document.querySelectorAll('.lazy-img');
const imgObserver = new IntersectionObserver(lazyImg, imgOptions);
images.forEach(function (img) {
  imgObserver.observe(img);
});

//////////////////////////////////////////////////////// slider component
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxLength = slides.length;

let curSlide = 0;
// slider.style.transform = 'scale(0.25) translateX(-1200px)';
// slider.style.overflow = 'visible';

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxLength - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
  // console.log(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxLength - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
  // console.log(curSlide);
};

goToSlide(0);
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// console.log(curSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

//////////////////////////////////////////////////// slider component (dots)
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (slide, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide="${index}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

createDots();
activeDot(0);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
    curSlide = slide;
    // console.log(curSlide);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////
