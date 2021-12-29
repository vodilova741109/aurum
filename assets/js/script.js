$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:true,
		slidesToShow:5,
		autoplay: true,
		speed:1000,
		autoplaySpeed:800,
		responsive:[
			{
				breakpoint: 1500,
				settings: {					
					slidesToShow:3
				}
			},
			{
				breakpoint: 811,
				settings: {					
					slidesToShow:2
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow:1,
					arrows: false,
				}
			}
		]
	});

	$('.center').slick({
		centerMode: true,
		centerPadding: '10px',
		slidesToShow: 6,
		autoplay: true,
		speed:1000,
		autoplaySpeed:800,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
				  arrows: false,
				  centerMode: true,
				  centerPadding: '60px',
				  slidesToShow: 3
				}
			  },
		  {
			breakpoint: 811,
			settings: {
			  arrows: false,
			  centerMode: true,
			  centerPadding: '60px',
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  arrows: false,
			  centerMode: true,
			  centerPadding: '40px',
			  slidesToShow: 1
			}
		  }
		]
	  });
});



