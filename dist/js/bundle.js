/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc(persons, restDays, place, totalValue) {

    let personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 5000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 5000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/contactForm.js":
/*!***************************************!*\
  !*** ./src/js/modules/contactForm.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function contactForm(message, statusMsg, contactForm, contactInput) {

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData(contactForm, contactInput)
                .then(() => {
                    statusMsg.innerHTML = message.loading;
                })
                .then(() => {
                    statusMsg.innerHTML = message.success;
                })
                .catch(() => {
                    statusMsg.innerHTML = message.fail;
                });
    });

    function sendData(form, input) {

        return new Promise((resolve, reject) => {
            form.appendChild(statusMsg);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(form);
            let obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }
}

module.exports = contactForm;

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form(message, statusMsg, form, input) {

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData(form, input)
                .then(() => {
                    statusMsg.innerHTML = message.loading;
                })
                .then(() => {
                    statusMsg.innerHTML = message.success;
                })
                .catch(() => {
                    statusMsg.innerHTML = message.fail;
                });
    });

    function sendData(form, input) {

        return new Promise((resolve, reject) => {
            form.appendChild(statusMsg);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(form);
            let obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }
}

module.exports = form;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal(moreBtn, overlay, closeBtn, descrBtn, animationName) {

    moreBtn.addEventListener('click', (event) => {
        overlay.style.display = 'block';
        event.target.classList.add(animationName);
        document.body.style.overflow = 'hidden';
    });

    descrBtn.forEach((item) => {
        item.addEventListener('click', (event) => {
            overlay.style.display = 'block';
            event.target.classList.add(animationName);
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        moreBtn.classList.remove(animationName);
        document.body.style.overflow = '';
    });
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider(slideIndex, slides, prev, next, dotsWrapper, dots, dotActiveName) {

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove(dotActiveName));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add(dotActiveName);
    }

    function increaseSlideIndex(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        increaseSlideIndex(-1);
    });
    
    next.addEventListener('click', () => {
        increaseSlideIndex(1);
    });

    dotsWrapper.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length; i++) {
            if (event.target.classList.contains('dot') &&
            event.target == dots[i]) {
                currentSlide(++i);
            }
        }
    });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {


function tabs(info, tab, tabName, tabContent) {

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains(tabName)) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer(deadline, hours, minutes, seconds) {

    function getTimeRemaning() {
        let difference = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((difference/1000)%60),
            minutes = Math.floor((difference/1000/60) % 60),
            hours = Math.floor((difference/(1000*60*60)));

            if (seconds < 0 || minutes < 0 || hours < 0) {
                hours = '00';
                minutes = '00';
                seconds = '00';
            } else {
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
            }

        return {
            'total' : difference,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock() {    
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let data = getTimeRemaning(deadline);
            hours.textContent = data.hours;
            minutes.textContent = data.minutes;
            seconds.textContent = data.seconds;

            if (data.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock();
}

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let tabs = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js"),
        modal = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js"),
        form = __webpack_require__(/*! ./modules/form.js */ "./src/js/modules/form.js"),
        contactForm = __webpack_require__(/*! ./modules/contactForm.js */ "./src/js/modules/contactForm.js"),
        slider = __webpack_require__(/*! ./modules/slider.js */ "./src/js/modules/slider.js"),
        calc = __webpack_require__(/*! ./modules/calc.js */ "./src/js/modules/calc.js");
    
    // info tabs
    let info = document.querySelector('.info-header'), 
        tab = document.querySelectorAll('.info-header-tab'),
        tabName = 'info-header-tab',
        tabContent = document.querySelectorAll('.info-tabcontent');

    tabs(info, tab, tabName, tabContent);

    // deadline timer
    let timerElem = document.getElementById('timer'),
        hours = timerElem.querySelector('.hours'),
        minutes = timerElem.querySelector('.minutes'),
        seconds = timerElem.querySelector('.seconds'),
        deadline = '2019-07-11 00:00';

    timer(deadline, hours, minutes, seconds);

    // modal window
    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.popup-close'),
        descrBtn = document.querySelectorAll('.description-btn'),
        animationName = 'more-splash';

    modal(moreBtn, overlay, closeBtn, descrBtn, animationName);

    // form sending
    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Наши менеджеры свяжутся с вами.',
        fail: 'Что-то пошло не так'
    },
    statusMsg = document.createElement('div'),
    formElem = document.querySelector('.main-form'),
    input = formElem.getElementsByTagName('input');
    statusMsg.classList.add('status');

    form(message, statusMsg, formElem, input);

    // contact form sending
    let contactFormElem = document.querySelector('#form'),
    contactInput = contactFormElem.getElementsByTagName('input');

    contactForm(message, statusMsg, contactFormElem, contactInput);

    // slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrapper = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        dotActiveName = 'dot-active';
    slider(slideIndex, slides, prev, next, dotsWrapper, dots, dotActiveName);

    // calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total');

    calc(persons, restDays, place, totalValue); 
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map