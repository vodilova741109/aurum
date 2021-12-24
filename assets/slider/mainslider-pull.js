/**
 * Инициализация слайдера
 * @param {number} config.slideToShow сколько слайдов показывать
 * @param {number} config.slideToScroll на сколько слайдов скролить за один  раз
 * @param {string} config.anchor якорь где инициализировать в DOM
 */

class renderingSlider {
  constructor(config) {
    // SET CONFIG PARAMETRES
    this.slideToShow = config.slideToShow || 1;
    this.slideToScroll = config.slideToScroll || 1;
    this.anchor = config.anchor || document.body;
    this.delay = config.delay || 3000;
    this.autoplay = config.autoplay || false;

    //внутренние переменные
    this.position = 0; //сдвиг трека в px
    this.currentSlide = 0; // номер слайда в показе     
    //this.newPosition = 0; // пока убрали
    this.items = this.anchor.querySelectorAll(".slider-item"); //массив слайдов
    console.log(this.items);
    this.interval; //временная переменная для хранения ссылки на setInterval
    this.itemsCount = this.items.length; // кол-во всех слайдов
    this.itemWidth = this.anchor.clientWidth / this.slideToShow; //размер каждого слайдера = размер контейнера всех элементов / на кол-во слайдеров в показе
    this.movePosition = this.slideToScroll * this.itemWidth; //на сколько двигать трек за один раз в px

    this.slider1 = document.querySelector("#slider-1");
    this.track = this.anchor.querySelector(".slider-track"); // обертка для последовательности слайдов
    this.wrapper = document.querySelector('.slider-wrapper'); //обёртка для всего слайдера
    this.btnPrev = this.anchor.querySelector(".btn-prev");
    this.btnNext = this.anchor.querySelector(".btn-next");
    this.preview = document.querySelector(".preview");  //картинка для показа в момент инициализации слайдера
    this.items = this.anchor.querySelectorAll(".slider-item"); //массив слайдов

    this.dot = this.anchor.querySelectorAll('.dot');
    this.subtitle = document.querySelector('.insert');
  }


  start() {
    const self = this;

    // проверка на наличие слайдов
    if (this.items === null || this.itemsCount === 0) {
      console.log("Не найден в Dom", track);
    } else {
      this.preview.style.display = "none";
      this.anchor.style.opacity = "1";
      // добавляем в стили ширину каждого слайда
      this.items.forEach((item) => {
        item.style.minWidth = `${this.itemWidth}px`;
        // console.log(item.style.minWidth);
      });
      // запускаем инициализацию обработчик событий      
      this.eventsListeners();

      // автопрокрутка
      //console.log(this.currentSlide);
      // console.log(this.itemsCount);
      if (this.autoplay && this.delay !== 0 && this.anchor === this.slider1) {
        this.interval = setInterval(self.slideScrollNext.bind(self), self.delay);
      }
    }
  }

  slideScroll(i) {
    /**
   * 
   * @param newPosition куда нужно попасть
   * @returns 
   */
    const self = this;

    const arr = Array.from(this.items);
    let slider = [];
    for (let key in arr) {
      slider.push(+key);
    }

    let currentSlide = Math.abs(this.position) / this.itemWidth;

    // получаем новую позицию по индексу радиокнопки
    function goTo(newPosition) {
      newPosition = i;
      // if (i){
      //    return i;
      // } else {
      //   i = currentSlide;
      // }      

      console.log(i);
      console.log(currentSlide);
      console.log(newPosition);
      // если новая позиция правее чем начальная точка
      // if(newPosition > 0){  
      //   if(newPosition < currentSlide){
      //     return  newPosition + currentSlide;  
      //   } else {
      //     return  newPosition - currentSlide; 
      //   }                   
      // }
      // if(newPosition < 0){
      //     if(currentSlide === 0){
      //         return  slider.length + newPosition;
      //     } else if(currentSlide > 0){
      //         return   newPosition - currentSlide ;
      //     }           
      // }

      return newPosition - currentSlide;

    }

    let numberSteps = goTo(0);

    if (numberSteps !== 0) {
      this.position1 =  numberSteps * this.itemWidth;
      console.log(this.position1);

    }
    //  else if (numberSteps < 0) {
    //   this.position1 = numberSteps * this.itemWidth;
    //   console.log(this.position1);
    // } 
    else {
      console.log(this.position);
      this.position1 = 0 * this.itemWidth;

    }

    //   this.position1 = 0;
    // }


    this.setComputedTreckStyle();

  }
  // активация точек слайдера
  radioButton() {

    const sliderDots = document.querySelector('.slider-dots'),
      tab = sliderDots.querySelectorAll('.dot'),
      tabs = Array.from(tab),
      arr = Array.from(this.items);

    const toggleTabContent = (index) => {
      for (let i = 0; i < arr.length; i++) {
        if (index === i) {
          //  передаем индекс таба слайду и добавляем или удаляем классы
          // arr[i].classList.remove('d-none');
          tabs[i].classList.add('dot-active');
          // console.log(newPosition);
        } else {
          // arr[i].classList.add('d-none');
          tabs[i].classList.remove('dot-active');
        }
      }
    }

    sliderDots.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('dot')) {
        //получаем индекс таба и передаем его как параметр в функцию
        tab.forEach((item, i) => {

          if (item === target) {
            // console.log(i);                  
            toggleTabContent(i);
            this.slideScroll(i);
          }
        })
      }

    })

    this.setComputedTreckStyle();
  }
  //сдвиг слайда на кол-во slideToScroll
  // вправо
  slideScrollNext() {
    const self = this;

    //1. Количество сдвинутых слайдов = (размер в px всех проскроленных слайдеров - кол-во слайдов для показа, которые отображены в данный момент на странице* ширину одного слайда)/ширину одного слайда
    const shiftedSlidesNumber =
      (Math.abs(this.position) + this.slideToShow * this.itemWidth) /
      this.itemWidth;

    // console.log(shiftedSlidesWidth);
    //2. оставшееся количество слайдов для прокрутки = к-во слайдов всего - ширина сдвинутых слайдов
    const itemsLeft = this.itemsCount - shiftedSlidesNumber;

    // 3. ширина оставшихся слайдов
    let remainingWidth = itemsLeft * this.itemWidth; // оставшаяяся ширина несдвинутых слайдов

    //slideToScroll - количество сладйов, на сколько мы сдвигаем за один раз
    //4. проверим хватает ли оставшихся слайдов для обычного шага
    let isRemainingSlidersEnough = itemsLeft >= this.slideToScroll;

    //5. если да сдвигаем на movePosition (px)
    //movePosition - на сколько двигать трек за один раз в px
    //если нет сдигаем на оставшуюся ширину remainingWidth
    this.position -= isRemainingSlidersEnough ? this.movePosition : remainingWidth;

    // if (this.currentSlide < this.itemsCount-1){
    this.currentSlide++;
    // }  

    this.setComputedTreckStyle();
    this.disableEdgeButtons();
    this.animationText();
    // прерывание slideScrollNext
    if (this.currentSlide === (this.itemsCount - 1)) {
      this.stopSlide();
    }

    this.slideScroll();
    const tab = document.querySelectorAll('.dot'),
      tabs = Array.from(tab),
      arr = Array.from(this.items);

    const toggleTabContent = (index) => {
      for (let i = 0; i < arr.length; i++) {
        if (index === i) {
          tabs[i].classList.add('dot-active');
        } else {
          tabs[i].classList.remove("dot-active");
        }
      }
    };
    toggleTabContent(this.currentSlide);
  }
  // влево
  slideScrollPrev() {
    const itemsLeft = Math.abs(this.position) / this.itemWidth; //оставшееся количество слайдов для прокрутки
    //movePosition - на сколько мы сдвинаем обычно
    let remainingWidth = itemsLeft * this.itemWidth; // оставшаяяся ширина несдвинутых слайдов
    //slideToScroll - количество сладйов, на сколько мы сдвигаем за один раз
    //проверим хватает ли оставшихся слайдов для обычного шага
    let isRemainingSlidersEnough = itemsLeft >= this.slideToScroll;
    //если да сдвигаем на movePosition
    //если нет сдигаем на оставшуюся ширину remainingWidth
    this.position += isRemainingSlidersEnough
      ? this.movePosition
      : remainingWidth;

    this.setComputedTreckStyle(); //выставим стили вычисленной позиции трека
    this.disableEdgeButtons();

    this.currentSlide--;
  }
  // остановка и запуск прокрутки слайдера при наведении мышки
  startSlide() {
    this.interval = setInterval(this.slideScrollNext.bind(this), this.delay);

    if (this.currentSlide === (this.itemsCount - 1)) {
      this.stopSlide();
    }

  }
  stopSlide() {
    clearInterval(this.interval);
  }
  eventMouse() {
    this.slider1.addEventListener("mouseover", this.stopSlide.bind(this));
    this.slider1.addEventListener("mouseout", this.startSlide.bind(this));
  }
  eventsListeners() {
    this.btnNext.addEventListener("click", this.slideScrollNext.bind(this));
    this.btnPrev.addEventListener("click", this.slideScrollPrev.bind(this));
  }
  // устанавливает позицию для track
  /**
   *
   */
  setComputedTreckStyle() {
    if (this.position1) {
      this.track.style.transform = `translateX(${this.position1}px)`;
    } else {
      this.track.style.transform = `translateX(${this.position}px)`;
    }
  }
  // крайние кнопки disabled ads
  disableEdgeButtons() {
    this.btnPrev.disabled = this.position === 0;
    this.btnNext.disabled = this.position <= -(this.itemsCount - this.slideToShow) * this.itemWidth;
    // this.btnNext.disabled = this.currentSlide === 10;
    // clearInterval(self.slideScrollNext.bind(self));
  }

  // анимация текста
  animationText() {
    let self = this;
    const items = this.anchor.querySelectorAll(".insert");
    let arr = Array.from(items);

    if (self.currentSlide === 0) {
      let splittedText = this.subtitle.innerHTML;
      loopThroughSplittedText(splittedText);
    } else if (self.currentSlide < this.itemsCount) {
      let splittedText = arr[self.currentSlide].innerHTML;
      loopThroughSplittedText(splittedText);
    }
    //  функция вывода анимации
    function loopThroughSplittedText(splittedText) {
      for (let i = 0; i < splittedText.length; i++) {
        // для каждой итерации добавляем букву
        // через паузу
        (function (i) {
          //
          setTimeout(
            function addText() {
              // console.log(self);
              let textItem = document.querySelectorAll('.subtitle');
              let arr = Array.from(textItem);
              // console.log(self.currentSlide);            
              arr[self.currentSlide].innerHTML += splittedText[i];
            }, 40 * i);
        })(i);
      };
    }
  }
}

/* конец функции слайдера */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const slider1 = document.querySelector("#slider-1");
  const slider2 = document.querySelector("#slider-2");

  // const config = {slideToShow: 5 , slideToScroll: 2, anchor: slider2, delay: 3000 , autoplay: 2000};

  //  первый слайдер  
  const firstSlider = new renderingSlider({
    anchor: document.querySelector("#slider-1"),
    slideToShow: 1,
    slideToScroll: 1,
    delay: 2500,
    autoplay: true,
  });

  firstSlider.animationText();
  firstSlider.eventMouse();
  firstSlider.radioButton();
  firstSlider.start();

  //  второй слайдер
  let secondSlider;
  if (window.matchMedia("(min-width: 1025px)").matches && slider2) {
    secondSlider = new renderingSlider({
      anchor: document.querySelector("#slider-2"),
      slideToShow: 5,
      slideToScroll: 2,
      delay: 0,
    });
  } else if (
    window.matchMedia("(min-width: 769px) and (max-width: 1024px)").matches
  ) {
    secondSlider = new renderingSlider({
      anchor: document.querySelector("#slider-2"),
      slideToShow: 3,
      slideToScroll: 1,
      delay: 0,
    });
  } else if (
    window.matchMedia("(min-width: 471px) and (max-width: 7681px)").matches
  ) {
    secondSlider = new renderingSlider({
      anchor: document.querySelector("#slider-2"),
      slideToShow: 2,
      slideToScroll: 1,
      delay: 0,
    });
  } else if (window.matchMedia("(max-width: 470px)").matches) {
    secondSlider = new renderingSlider({
      anchor: document.querySelector("#slider-2"),
      slideToShow: 1,
      slideToScroll: 1,
      delay: 0,
    });
  }
  secondSlider.start();
});

// каждую букву обернуть в span
// const el = document.querySelector('.subtitle');

// spanize(el);

// function spanize(el) {
//   setTimeout(() => {
//     el.innerHTML =  el.innerHTML.replace(/(.)/g, '<span>$1</span>');
//     let span = document.querySelectorAll('.subtitle span');

//     span.forEach((item) => {
//       console.log(item.length);

//       for (var i = 0; i < item.length; i++) {
//         // for each iteration console.log a word
//         // and make a pause after it
//         (function (i) {
//             setTimeout(function () {
//               item.style.opacity = '1';
//               console.log(item);
//             }, 1000 * i);
//         })(i);
//     };

//     function loopThroughSplittedText(splittedText) {
//       console.log(splittedText.length);

//       for (let i = 0; i < splittedText.length; i++) {      
//           (function (i) {
//               setTimeout(function () {
//                   // i.style.color = 'red';
//                   console.log(splittedText[i]);
//               }, 1000 * i);
//           })(i);
//       };
//     }
//   loopThroughSplittedText(splittedText);

//     })
//    }, 10);

// }
// console.log(el);

// попытка анимации 1

// вернуться к анимации
// let stringEl = document.querySelector('.header');
// let stringText = stringEl.innerText;
// stringEl.innerText = "";
// let resultHTML = "";
// for(i=0;i<stringText.length;i++) {
//   resultHTML += `<span style="transition-delay:${[i]}00ms,${[i]}00ms">${stringText[i]}</span>`
// }
// stringEl.insertAdjacentHTML('afterbegin',resultHTML);
