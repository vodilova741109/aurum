'use strict';
function addsiemaItem(){
    const siemaItem = document.querySelectorAll('.siema-item');	
    const arraySiemaItem = [...siemaItem]; 
    // console.log(siemaItem);

}
addsiemaItem();


window.addEventListener("load", () => {
    var carousels = document.querySelectorAll(".carousel-3d");
    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});
function carousel(root) {
    var figure = root.querySelector("figure"),
    nav = root.querySelector("nav"),
    images = figure.children,
    n = images.length,
    gap = root.dataset.gap || 0,
    bfc = "bfc" in root.dataset,
    theta = 2 * Math.PI / n,
    currImage = 0;
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener("resize", () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();
    function setupCarousel(n, s) {
        var apothem = s / (2 * Math.tan(Math.PI / n));
        figure.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (var i = 0; i < n; i++) images[i].style.padding = `0 ${gap}px`;
        for (i = 0; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        if (bfc)
        for (i = 0; i < n; i++) images[i].style.backfaceVisibility = "hidden";
        rotateCarousel(currImage);
    }
    function setupNavigation() {
        nav.addEventListener("click", onClick, true);
        function onClick(e) {
            e.stopPropagation();
            var t = e.target;
            if (t.tagName.toUpperCase() != "BUTTON") return;
            if (t.classList.contains("next")) {
                currImage++;
                } else {
                currImage--;
            }
            rotateCarousel(currImage);
        }
    }
    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
    
    let cur;
    function showcur() {
        cur = setInterval(function() {
            currImage++;
            rotateCarousel(currImage);
        }, 2000);
    }
    function clearcur() {
        clearInterval(cur);
    }
    root.onmouseover  = function() {
        clearcur();
    }  
    root.onmouseout  = function() {
        showcur();
    }     
    showcur();
}


//слайдер в шапке

(function($){

	var Carousel = function(poster){
		var self = this;
		//
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		// console.log(poster);
		this.posterItems = poster.find("li.poster-item");
		if( this.posterItems.size()%2 == 0 ){
			this.posterItemMain.append( this.posterItems.eq(0).clone() );
			this.posterItems = this.posterItemMain.children();
		};
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;
		//
		this.setting = {
			"width" : 9000,			//
			"height" : 500,			//
			"posterWidth" : 640,	//
			"posterHeight" : 500,	//
			"scale" : 0.9,			//
			"speed" : 500,
			"autoPlay" : false,
			"delay" : 5000,
			"verticalAlign" : "middle" //top bottom
		};
		$.extend( this.setting,this.getSetting() );
		
		//
		this.setSettingValue();
		//
		this.setPosterPos();
		//
		this.nextBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			};
		});
		//еП≥жЧЛиљђжМЙйТЃ
		this.prevBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			};
		});
		//жШѓеР¶еЉАеРѓиЗ™еК®жТ≠жФЊ
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover( function(){
				//self.timerжШѓsetIntervalзЪДзІНе≠Р
				window.clearInterval(self.timer);
			}, function(){
				self.autoPlay();
			});			
		};
	};
	Carousel.prototype = {
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval( function(){
				self.nextBtn.click();
			}, this.setting.delay );
		},

		carouseRotate:function(dir){
			var _this_  = this;
			var zIndexArr = [];
			
			if(dir === "left"){
				this.posterItems.each(function(){
					var self = $(this),
						prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width = prev.width(),
						height =prev.height(),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top"),
						zIndex = prev.css("zIndex");

					zIndexArr.push(zIndex);
					self.animate({
						width :width,
						height :height,
					  //zIndex :zIndex,
					    opacity :opacity,
					    left :left,
					    top :top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});
				//zIndexйЬАи¶БеНХзЛђдњЭе≠ШеЖНиЃЊзљЃпЉМйШ≤ж≠ҐеЊ™зОѓжЧґеАЩиЃЊзљЃеЖНеПЦзЪДжЧґеАЩеАЉж∞ЄињЬжШѓжЬАеРОдЄАдЄ™зЪДzindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir === "right"){//еП≥жЧЛиљђ
				this.posterItems .each(function(){
					var self = $(this),
						next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width = next.width(),
						height =next.height(),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top"),
						zIndex = next.css("zIndex");

					zIndexArr.push(zIndex);					
					self.animate({
						width :width,
						height :height,
					  //zIndex :zIndex,
					    opacity :opacity,
					    left :left,
					    top :top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});	
				});
				//zIndexйЬАи¶БеНХзЛђдњЭе≠ШеЖНиЃЊзљЃпЉМйШ≤ж≠ҐеЊ™зОѓжЧґеАЩиЃЊзљЃеЖНеПЦзЪДжЧґеАЩеАЉж∞ЄињЬжШѓжЬАеРОдЄАдЄ™зЪДzindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			};
		},
		//иЃЊзљЃеЙ©дљЩзЪДеЄІзЪДдљНзљЃеЕ≥з≥ї
		setPosterPos:function(){
			var self = this,
				sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				//е≠ШеЬ®еЫЊзЙЗе•ЗеБґжХ∞йЧЃйҐШ
				level = Math.floor(this.posterItems.size()/2),
				leftSlice = sliceItems.slice(sliceSize);
			
			//иЃЊзљЃеП≥иЊєеЄІзЪДдљНзљЃеЕ≥з≥їеТМеЃљеЇ¶йЂШеЇ¶top
			var firstLeft = (this.setting.width - this.setting.posterWidth)/2;
			var rw = this.setting.posterWidth,
				fixOffsetLeft = firstLeft + rw,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth)/2)/level;
			
			//
			rightSlice.each(function(i){
				level--;
				rw = rw * self.setting.scale;
				rh = rh * self.setting.scale;
				var j = i;
				$(this).css({
					zIndex :level,
					width :rw,
					height :rh,
					opacity :1/(++j),
					left :fixOffsetLeft+(++i)*gap - rw,
					top :self.setVerticalAlign(rh)
				});
			});

			//
			var lw = rightSlice.last().width(),
				lh  =rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
				$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:1/oloop,
					left:i*gap,
					top:self.setVerticalAlign(lh)
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});
		},
	
		//
		setVerticalAlign:function(height){
			var verticalType  = this.setting.verticalAlign,
				top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{
				top = (this.setting.height-height)/2;
			};
			return top;
		},

		//
		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			//иЃ°зЃЧдЄКдЄЛеИЗжНҐжМЙйТЃзЪДеЃљеЇ¶
			var w = (this.setting.width-this.setting.posterWidth)/2;
			//иЃЊзљЃеИЗжНҐжМЙйТЃзЪДеЃљйЂШпЉМе±ВзЇІеЕ≥з≥ї
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});			
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				top:0,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},

		//иОЈеПЦдЇЇеЈ•йЕНзљЃеПВжХ∞
		getSetting:function(){			
			var setting = this.poster.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		}	
	};

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){		
			new  _this_($(this));
		});
	};

	//жМВиљљеИ∞windowдЄЛ
	window["Carousel"] = Carousel;

})(jQuery);


/*initial*/
$(function(){
	Carousel.init($(".pictureSlider"));
});



// 2-й слайдер




