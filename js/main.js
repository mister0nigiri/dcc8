const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 40, 

  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  }
});


//Slider2
const slider2 = new Swiper ('.slider2', {
  loop: true,
  speed: 1500,
  effect: 'fade',
  fadeEffect: {           
    crossFade: true     
  },                     
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});





document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; 
  const IS_OPENED_CLASS = "is-opened"; 

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");
    const closeButton = element.querySelector(".close-button");

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      if (element.open) {
        element.classList.toggle(IS_OPENED_CLASS);
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        element.dataset.animStatus = RUNNING_VALUE;
        closingAnim.onfinish = () => {
          element.removeAttribute("open");
          element.dataset.animStatus = "";
        };
      } else {
        element.setAttribute("open", "true");
        element.classList.toggle(IS_OPENED_CLASS);
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        element.dataset.animStatus = RUNNING_VALUE;
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });

    if (closeButton) {
      closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (element.open) {
          const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
          element.dataset.animStatus = RUNNING_VALUE;
          closingAnim.onfinish = () => {
            element.removeAttribute("open");
            element.dataset.animStatus = ""; 
          };
        }
      });
    }
  });
}

const animTiming = {
  duration: 400,
  easing: "ease-out"
};

const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];




// セレクタ名（.pagetop）に一致する要素を取得
const pagetop_btn = document.querySelector(".pagetop");

// .pagetopをクリックしたら
pagetop_btn.addEventListener("click", scroll_top);

// ページ上部へスムーズに移動
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}

// スクロールされたら表示
window.addEventListener("scroll", scroll_event);
function scroll_event() {
  if (window.pageYOffset > 100) {
    pagetop_btn.style.opacity = "1";
  } else if (window.pageYOffset < 100) {
    pagetop_btn.style.opacity = "0";
  }
}





const open = document.querySelector('#open');
const close = document.querySelector('#close');
const modal = document.querySelector('#modal');
const mask = document.querySelector('#mask');

const showKeyframes = {
  opacity: [0, 1],
  visibility: 'visible',
};

const hideKeyframes = {
  opacity: [1, 0],
  visibility: 'hidden',
};

const options = {
  duration: 800,
  easing: 'ease',
  fill: 'forwards',
};

open.addEventListener('click', () => {
  modal.animate(showKeyframes, options);
  mask.animate(showKeyframes, options);
});

close.addEventListener('click', () => {
  modal.animate(hideKeyframes, options);
  mask.animate(hideKeyframes, options);
});

mask.addEventListener('click', () => {
  close.click();
});





const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'],
          translate: ['0 4rem', 0],
          // translate: ['4rem 0', 0]右,
          // translate: ['-4rem 0', '0']左,
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};


const fadeObserver = new IntersectionObserver(animateFade);

const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});




// 左からフェードイン
const leftFade = (entries, obs) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'],
          // translate: ['4rem 0', 0]右,
          translate: ['-4rem 0', '0'],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};


const leftObserver = new IntersectionObserver(leftFade);

const leftElements = document.querySelectorAll('.leftin');
leftElements.forEach((leftElement) => {
  leftObserver.observe(leftElement);
});


// 右からフェードイン
const rightFade = (entries, obs) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'],
          translate: ['4rem 0', 0],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};


const rightObserver = new IntersectionObserver(rightFade);

const rightElements = document.querySelectorAll('.rightin');
rightElements.forEach((rightElement) => {
  rightObserver.observe(rightElement);
});