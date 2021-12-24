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

    this.position = 0; //сдвиг трека в px
    this.currentSlide = 0; // номер слайда в показе     
    this.interval;

    this.slider1 = document.querySelector("#slider-1");   
    this.track = this.anchor.querySelector(".slider-track");
    this.wrapper = document.querySelector('.slider-wrapper');
    this.btnPrev = this.anchor.querySelector(".btn-prev");
    this.btnNext = this.anchor.querySelector(".btn-next");
    this.preview = document.querySelector(".preview");
    this.items = this.anchor.querySelectorAll(" .slider-item"); 
    this.dot =this.anchor.querySelectorAll('.dot'); 
    
    
    this.itemsCount = this.items.length; // кол-во всех слайдеров
    this.itemWidth = this.anchor.clientWidth / this.slideToShow; //размер каждого слайдера = размер контейнера всех элементов / на кол-во слайдеров в показе
    this.movePosition = this.slideToScroll * this.itemWidth; //на сколько двигать трек за один раз в px
    this.subtitle = document.querySelector('.insert');   
    
  }
  

  start() {   
    const self = this;
    // проверка на наличие слайдов
    if (this.items === null || this.itemsCount === 0)  {
      console.log("Не найден в Dom", track);
    } else {
      this.preview.style.display = "none";
      this.anchor.style.opacity= "1";
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
      if (this.autoplay && this.delay !== 0  && this.anchor === this.slider1) {
        this.interval = setInterval(self.slideScrollNext.bind(self), self.delay);     
      }  
    }
     
 
  }
  //сдвиг слайда на кол-во slideToScroll
  // вправо
  slideScrollNext() {
    const self = this;
    // this.itemsCount; 
    // let arr = [0, 1, 2, 3 , 4, 5, 6 , 7 , 8, 9];    
    // // перебор массива и получение индекса и текста
    // let n = 0;    
    //   for( let i = 0 ; i< arr.length; i++){
    //     n = i;        
    //     console.log(n); 
    //     let text = arr[i].innerHTML;
    //     // console.log(text);        
    //   } 
    //  показывает последний слайд, так как прошел весь цикл и остановился на последнем
    //  console.log(n);  


    //Ширина сдвинутых слайдов = (размер в px всех проскроленных слайдеров - кол-во слайдов для показа, которые отображены в данный момент на странице* ширину одного слайда)/ширину одного слайда
    const shiftedSlidesWidth =
      (Math.abs(this.position) + this.slideToShow * this.itemWidth) /
      this.itemWidth;
    //оставшееся количество слайдов для прокрутки = к-во слайдов всего - ширина сдвинутых слайдов
    const itemsLeft = this.itemsCount - shiftedSlidesWidth;

    //movePosition - на сколько мы сдвинаем обычно
    let remainingWidth = itemsLeft * this.itemWidth; // оставшаяяся ширина несдвинутых слайдов

    //slideToScroll - количество сладйов, на сколько мы сдвигаем за один раз
    //проверим хватает ли оставшихся слайдов для обычного шага
    let isRemainingSlidersEnough = itemsLeft >= this.slideToScroll;

    //если да сдвигаем на movePosition
    //если нет сдигаем на оставшуюся ширину remainingWidth
    this.position -= isRemainingSlidersEnough ? this.movePosition : remainingWidth;   
    this.currentSlide++; 
    // console.log(this.currentSlide);
    this.setComputedTreckStyle();
    this.disableEdgeButtons();   
    this.animationText(); 
    // прерывание slideScrollNext
    if(this.currentSlide === this.itemsCount ){
      clearInterval(this.interval);
    }
    // console.log(this.currentSlide);
    // console.log(this.itemsCount);
  }

    slideScrollNext() {
    const self = this;
    // this.itemsCount; 
    // let arr = [0, 1, 2, 3 , 4, 5, 6 , 7 , 8, 9];    
    // // перебор массива и получение индекса и текста
    // let n = 0;    
    //   for( let i = 0 ; i< arr.length; i++){
    //     n = i;        
    //     console.log(n); 
    //     let text = arr[i].innerHTML;
    //     // console.log(text);        
    //   } 
    //  показывает последний слайд, так как прошел весь цикл и остановился на последнем
    //  console.log(n);  


    //Ширина сдвинутых слайдов = (размер в px всех проскроленных слайдеров - кол-во слайдов для показа, которые отображены в данный момент на странице* ширину одного слайда)/ширину одного слайда
    const shiftedSlidesWidth =
      (Math.abs(this.position) + this.slideToShow * this.itemWidth) /
      this.itemWidth;
    //оставшееся количество слайдов для прокрутки = к-во слайдов всего - ширина сдвинутых слайдов
    const itemsLeft = this.itemsCount - shiftedSlidesWidth;

    //movePosition - на сколько мы сдвинаем обычно
    let remainingWidth = itemsLeft * this.itemWidth; // оставшаяяся ширина несдвинутых слайдов

    //slideToScroll - количество сладйов, на сколько мы сдвигаем за один раз
    //проверим хватает ли оставшихся слайдов для обычного шага
    let isRemainingSlidersEnough = itemsLeft >= this.slideToScroll;

    //если да сдвигаем на movePosition
    //если нет сдигаем на оставшуюся ширину remainingWidth
    this.position -= isRemainingSlidersEnough ? this.movePosition : remainingWidth;   
    this.currentSlide++; 
    // console.log(this.currentSlide);
    this.setComputedTreckStyle();
    this.disableEdgeButtons();   
    this.animationText(); 
    // прерывание slideScrollNext
    if(this.currentSlide === this.itemsCount ){
      clearInterval(this.interval);
    }
    // console.log(this.currentSlide);
    // console.log(this.itemsCount);
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

    this.setComputedTreckStyle(); //выставим стили вычисленной позиции трека
    this.disableEdgeButtons();
  
    this.currentSlide--; 
  }
  // остановка и запуск прокрутки слайдера при наведении мышки
   startSlide(){
    this.interval = setInterval(this.slideScrollNext.bind(this), this.delay); 
    if(this.currentSlide === this.itemsCount ){     
      clearInterval(this.interval);
    }
   
  }
  stopSlide(){
    clearInterval(this.interval);
  }
  eventMouse(){
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
    this.btnNext.disabled =
      this.position <= -(this.itemsCount - this.slideToShow) * this.itemWidth;
      // clearInterval(self.slideScrollNext.bind(self));
  }

  // активация точек слайдера
  tabs(){
    const sliderDots = document.querySelector('.slider-dots'),
          tab = sliderDots.querySelectorAll('.dot'), 
          tabs = Array.from(tab),       
          arr = Array.from(this.items);        
          const toggleTabContent = (index) => {   
            for(let i = 0; i< arr.length; i++){   
              if(index === i){
                //  передаем индекс таба слайду и добавляем или удаляем классы
                arr[i].classList.remove('d-none');
                tabs[i].classList.add('dot-active');
              } else {
                arr[i].classList.add('d-none');
                tabs[i].classList.remove('dot-active');
              }
            }
          }
          sliderDots.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.classList.contains('dot')){
              //получаем индекс таба и передаем его как параметр в функцию
              tab.forEach((item, i) =>{
                if(item === target){
                  // console.log(i);                  
                  toggleTabContent(i);
                  console.log(tabs[i]);
                }
              })
            }

          })

  }
  // анимация текста
  animationText(){
    let self = this;
    const items = this.anchor.querySelectorAll(".insert");
    let arr = Array.from(items);
     
       if(self.currentSlide === 0){
        let splittedText = this.subtitle.innerHTML;     
        loopThroughSplittedText(splittedText);          
       } else if(self.currentSlide < this.itemsCount) {               
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
  firstSlider.tabs();  
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






