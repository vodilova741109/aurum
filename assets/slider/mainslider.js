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

    // Elements DOM
    this.slider1 = document.querySelector("#slider-2");
    this.track = this.anchor.querySelector(".slider-track");
    this.wrapper = document.querySelector(".slider-wrapper");
    this.btnPrev = this.anchor.querySelector(".btn-prev");
    this.btnNext = this.anchor.querySelector(".btn-next");
    this.preview = document.querySelector(".preview");
    this.items = this.anchor.querySelectorAll(" .slider-item");
    this.dot = this.anchor.querySelectorAll(".dot");
    this.subtitle = document.querySelector(".insert");
    this.sliderDots = document.querySelector(".slider-dots");
    this.tab = document.querySelectorAll(".dot");
    this.tabs = Array.from(this.tab);
    this.arr = Array.from(this.items);

    // calculated constants
    this.position = 0; //сдвиг трека в px
    this.currentSlide = 0; // номер слайда в показе
    this.newPosition = 0; // новая позиция, куда нужно попасть  
    this.itemsCount = this.items.length; // кол-во всех слайдеров
    this.itemWidth = this.anchor.clientWidth / this.slideToShow; //размер каждого слайдера = размер контейнера всех элементов / на кол-во слайдеров в показе
    this.movePosition = this.slideToScroll * this.itemWidth; //на сколько двигать трек за один раз в px

   // ссылка на функцию SetInterval, необходима для остановки в методе stopSlide
    this.interval;
    this.animate;
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
      });  
      // this.addNumberDot();  
      // запускаем инициализацию обработчик событий
      this.eventsListeners();     
      
      // автопрокрутка  
      if (this.autoplay && this.delay !== 0 && this.anchor === this.slider1) {
        this.interval = setInterval(this.slideScrollNext.bind(this), this.delay);        
      }  
    }

    
   
    
  }
  addNumberDot(){
    for (let i = 0; i < this.itemsCount; i++) {
     
      const li = document.createElement('li');
      li.classList.add('dot');
      this.sliderDots.append(li);      
      }
  }
 
  //сдвиг слайда на кол-во slideToScroll
  // вправо
  slideScrollNext() {
    const self = this;

    //1. Количество сдвинутых слайдов = (размер в px всех проскроленных слайдеров - кол-во слайдов для показа, которые отображены в данный момент на странице* ширину одного слайда)/ширину одного слайда
    const shiftedSlidesNumber = (Math.abs(this.position) + this.slideToShow * this.itemWidth) / this.itemWidth;

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

     
    this.currentSlide = -(this.position) / this.itemWidth;

    // let arr = [...this.items];
    // // console.log(arr.length-1);

    // if(this.currentSlide === arr.length-1){
    //   this.position = 0;

    // } else {
    //   this.position -= isRemainingSlidersEnough ? this.movePosition : remainingWidth;
    //   }    
    // }

    this.setComputedTreckStyle();
    this.disableEdgeButtons();   
    this.animationText(); 
   
    if (this.currentSlide === this.itemsCount - 1) {
      this.stopSlide();  
      }

    const toggleTabContent = (index) => {
      for (let i = 0; i < this.arr.length; i++) {      
        if (index === i) {
          this.tabs[i].classList.add("dot-active");          
        } else {
          this.tabs[i].classList.remove("dot-active");
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
    this.position += isRemainingSlidersEnough ? this.movePosition : remainingWidth;

    // let arr = [...this.items];
    

    // if(this.currentSlide === 0){
    //   console.log('первый слайд');
    //   this.position = -(arr.length-1)*this.itemWidth;

    // } else {
    //   console.log(arr[0]) ;
    //   this.position += isRemainingSlidersEnough ? this.movePosition : remainingWidth;
    //   }
    
       

    this.setComputedTreckStyle(); //выставим стили вычисленной позиции трека
    this.disableEdgeButtons();    
    
    // this.currentSlide = -(this.position) / this.itemWidth;
    this.currentSlide--;   

    const toggleTabContent = (index) => {
      for (let i = 0; i < this.arr.length; i++) {        
        if (index === i) {          
          this.tabs[i].classList.add("dot-active");
        } else {
          this.tabs[i].classList.remove("dot-active");
        }
      }
    };
    toggleTabContent(this.currentSlide);
    
  }

  slideScroll(i) {
    /**
     *
     * @param newPosition куда нужно попасть
     * @returns
     */
    const self = this;

    // получаем новую позицию по индексу радиокнопки          
    
    self.newPosition = i;  
 
   if (self.newPosition !== 0) {    
      this.position = -self.newPosition * this.itemWidth;      
    }
     else if(self.newPosition === 0){  
      this.position = 0 * this.itemWidth; 
          
    } 

    this.setComputedTreckStyle();    
    this.disableEdgeButtons();     
  }


  // активация точек слайдера
  radioButton() {    
   
    const toggleTabContent = (index) => {
      for (let i = 0; i < this.arr.length; i++) {        
        if (index === i) {        
          this.tabs[i].classList.add("dot-active");           
        } else {          
          this.tabs[i].classList.remove("dot-active");
        }
      }
    };
    this.sliderDots.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("dot")) {
        //получаем индекс таба и передаем его как параметр в функцию
        this.tab.forEach((item, i) => {
          if (item === target) {           
            toggleTabContent(i);            
            this.animationText(i);              
            this.slideScroll(i);      
          }
        });
      }
    });

  }
  // остановка и запуск прокрутки слайдера при наведении мышки
  startSlide() {
    this.interval = setInterval(this.slideScrollNext.bind(this), this.delay);   
    if (this.currentSlide === this.itemsCount - 1) {
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
  setComputedTreckStyle() {    
      this.track.style.transform = `translateX(${this.position}px)`;
    
  }
  // крайние кнопки disabled ads
  disableEdgeButtons() {    
    this.btnPrev.disabled = this.position === 0;
    this.btnNext.disabled = this.position <= -(this.itemsCount - this.slideToShow) * this.itemWidth;  
  }
  // анимация текста
  animationText(i) {   
    let self = this;
    const items = this.anchor.querySelectorAll(".insert");
    let arr = Array.from(items);
    const textItem = document.querySelectorAll(".subtitle");
    let array = Array.from(textItem);  
    let index = 0;
   
    if(i){
      const text = arr[i].innerHTML;
      let splittedText = text;   
      console.log(splittedText);
      index = i;        
      loopThroughSplittedText(splittedText);
    } else if (self.currentSlide === 0) {      
      // let splittedText = this.subtitle.innerHTML;
      // loopThroughSplittedText(splittedText);
    } else if (self.currentSlide < this.itemsCount && typeof arr[self.currentSlide] !== 'undefined') { 
    
      let splittedText = arr[self.currentSlide].innerHTML;  
      
      index = self.currentSlide;      
      loopThroughSplittedText(splittedText);
    }
    //  функция вывода анимации  
    function loopThroughSplittedText(splittedText) {
    
      for (let i = 0; i < splittedText.length; i++) {
        // для каждой итерации добавляем букву
        // через паузу
        
        (function (i) {
          //
          if(index){
            if(array[index].innerHTML ===''){
              setTimeout(function addText() {
                array[index].innerHTML += splittedText[i]; 
                //  array[self.currentSlide].innerHTML понять как поменять индекс
            }, 40 * i);          
            }
          } else{
            if(array[self.currentSlide].innerHTML ===''){
              setTimeout(function addText() {
                // console.log(splittedText);
                array[index].innerHTML += splittedText[i]; 
                //  array[self.currentSlide].innerHTML понять как поменять индекс
            }, 40 * i);
            }
          } 
          
        })(i);
      }
    }   
  }
}

/* конец функции слайдера */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  // const slider1 = document.querySelector("#slider-1");
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
  // firstSlider.addNumberDot();
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


