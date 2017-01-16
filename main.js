'use strict';
(() => {
	//setup DOM
	const container = document.querySelector('#main-block'), 
		rainContainer = document.querySelector('.rain-block'), 
		phoneContainer = container.querySelector('.phone-image'), 
		closeButton = container.querySelector('.close-block'), 
		internals = container.querySelector('.internals'), 
		internalsWrapper = container.querySelector('.internals-wrapper'), 
		containerFrame = container.querySelector('.internals-card'), 
		phoneWrapper = container.querySelector('#phone-wrap'), 
		caseFlash = container.querySelector('.case-flash'), 
		dragbar = container.querySelector('#dragbar'), 
		buynowEl = container.querySelector('.buynow'), 
		videoContainer = container.querySelector('.video-container'), 
		stripes = container.querySelector('.stripes'), 
		description = document.querySelector('.description'),
		range = container.querySelector('#range'),
		db = videoContainer.querySelector('.db'),
		textList = container.querySelectorAll('.text');
		
	//variables
	let	rainStart = false,
		createDrops = null, 
		randomPositionTop,
		randomPositionLeft,
		dropstyle; 
		
	//create elements
	const frame = document.createElement('img'), 
		  flashDiv = document.createElement('div'), 
		  imgPhone = document.createElement('img'), 
		  flash = document.createElement('div'), 
		  loadingLable = document.createElement('div'); 
	
	//loading img
	(() => {
		loadingLable.classList.add('loading-lable');
		container.insertBefore(loadingLable, container.firstChild);
	})()

	let firstOps = () => {	
		imgPhone.src = "./images/samsung-sprite.png";
		frame.src = "./images/card-slot.png";

		internalsWrapper.classList.add('inside-phone');
		flash.classList.add('flash');
		frame.classList.add('frame');
	
		phoneContainer.appendChild(imgPhone);
		containerFrame.appendChild(flashDiv);
		internals.appendChild(frame);

		const closeLoopMe = document.querySelector('.close-loopme'),
			loopMe = document.querySelector('.loopme');

		db.addEventListener('click', () => {
			closeLoopMe.style.display="block";
			loopMe.style.display="block"
		});
		
		closeLoopMe.addEventListener('click', () => {
			loopMe.style.display = 'none';
			closeLoopMe.style.display="none";
		});
		
		closeButton.addEventListener('click', () => window.close());
	}

	//DOM is ready
	window.addEventListener("load", function load (event) {
		phoneWrapper.style.top = '14px';
		dragbar.style.top = '18px';
		textList[0].classList.add('active');
		buynowEl.style.opacity = '1';
		videoContainer.style.opacity = '1';
		stripes.style.display = 'block';
		loadingLable.classList.add('hide-text');
		firstOps();
    	window.removeEventListener("load", load, false); 
	}, false);	

	//get and set Ranges 
	range.addEventListener('input', (e) => {
		let rangeValue = range.value;

		imgPhone.style.transform = 'translateY(-'+ rangeValue * 221 +'px)';                   
		textBust(rangeValue,textList);
		trackingInternals(rangeValue);
		trackingFlash(rangeValue);
		rain(rangeValue);
		trackingVideo(rangeValue);
		onOffVideo(rangeValue);
	});

	// Sidebar text 
	function textBust (rangeValue) {		
		if (rangeValue <= 3) {
			changeText(textList, textList[0]);
		} else if (rangeValue > 3 && rangeValue <= 20) {
			changeText(textList, textList[1]);
		} else if (rangeValue > 21 && rangeValue <= 44) {
			changeText(textList, textList[2]);
		} else if (rangeValue > 45 && rangeValue < 60) {
			changeText(textList, textList[3]);
		};
	};

	function changeText (list, el) {
		for (let i = 0; i < list.length; i++) {
			list[i].classList.remove('active');
		};	
		el.classList.add('active');
	};
				
	// internals 
	function trackingInternals (rangeValue) {
		if (rangeValue > 57 && rangeValue < 59) {
			internals.style.opacity = '1';
			internals.style.transition = '1s';
			flashDiv.classList.add('card-flash');
		} else {
			internals.style.opacity = '0';
			internals.style.transition = '0s';
			flashDiv.classList.remove('card-flash');
			}
		};

	//flashing 
	function trackingFlash (rangeValue) {
		if (rangeValue == 29 ) {
			caseFlash.appendChild(flash);
			addFlash();
		};
	};

	function addFlash () {
		let timer = setTimeout(() => {
			caseFlash.removeChild(flash);
		}, 500);
	};

	//video 
	function trackingVideo (rangeValue) {
		if (rangeValue <= 0) {
			videoContainer.style.opacity = '1';
			videoContainer.style.transition = '.5s';
			stripes.style.display = 'block';
		} else {
			videoContainer.style.opacity = '0';
			videoContainer.style.transition = '0s';
			stripes.style.display = 'none'
		}
	};

	function onOffVideo (rangeValue) {
    	rangeValue == 0 ? toggleVideo() : toggleVideo('played');
    };
    	
	function toggleVideo (state) {
		let iframe = videoContainer.getElementsByTagName("iframe")[0].contentWindow,
		    func = state == 'played' ? 'pauseVideo' : 'playVideo';
		iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
		};

	//make rain
	function rain (rangeValue) {
		if (rangeValue > 3 && rangeValue <= 20) {
			rainContainer.style.opacity = '1';

			if (!rainStart) {
				createDrop();
			};
		} else {
			rainStart = false;
			rainContainer.innerHTML = '';
			clearInterval(createDrops);
			rainContainer.style.opacity = '0';
			rainContainer.style.transition = '1s';
		};
	};
				
	function chooseRainDrop () {
		const dropstylesArray = ['dropstyle1','dropstyle2','dropstyle3','dropstyle4'];
			for (let i = 0; i < 4; i++) {
				dropstyle = dropstylesArray[Math.floor(Math.random()*4)];
			};
	};

	function randPosition () {
		randomPositionTop = Math.floor((Math.random()*rainContainer.offsetHeight)-30);
		randomPositionLeft = Math.floor((Math.random()*rainContainer.offsetWidth)-30);
	};

	function createDrop () {
		rainStart = true;

		createDrops = setInterval(() => {
			let randomDrop = document.createElement('div');

			chooseRainDrop();
			randPosition();
			rainContainer.appendChild(randomDrop);
			randomDrop.classList.add(dropstyle);
			randomDrop.style.top = randomPositionTop + 'px';
			randomDrop.style.left = randomPositionLeft + 'px';
		}, 75);
	};
				
})();