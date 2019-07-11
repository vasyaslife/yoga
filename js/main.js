window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Tab content
    let info = document.querySelector('.info-header'), 
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

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
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Deadline
    // Put here your deadline
    let deadline = '2019-07-11 00:00';

    function getTimeRemaning(endtime) {
        let difference = Date.parse(endtime) - Date.parse(new Date()),
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

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let data = getTimeRemaning(endtime);
            hours.textContent = data.hours;
            minutes.textContent = data.minutes;
            seconds.textContent = data.seconds;

            if (data.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Put this when you need to init your timer
    setClock('timer', deadline);

    // Modal
    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.popup-close'),
        descrBtn = document.querySelectorAll('.description-btn');

    moreBtn.addEventListener('click', (event) => {
        overlay.style.display = 'block';
        event.target.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    descrBtn.forEach((item) => {
        item.addEventListener('click', (event) => {
            overlay.style.display = 'block';
            event.target.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        moreBtn.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Msg for status
    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Наши менеджеры свяжутся с вами.',
        fail: 'Что-то пошло не так'
    },
    statusMsg = document.createElement('div');
    statusMsg.classList.add('status');

    // Modal form
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input');

    // AJAX modal
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

    // Contact form
    let contactForm = document.querySelector('#form'),
        contactInput = contactForm.getElementsByTagName('input');

    contactForm.addEventListener('submit', (event) => {
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

    // AJAX sending JSON data from form
    function sendData(form, input) {

        return new Promise((resolve, reject) => {
            form.appendChild(statusMsg);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // 

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

    // Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrapper = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
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
});