window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let tabs = require('./modules/tabs.js'),
        timer = require('./modules/timer.js'),
        modal = require('./modules/modal.js'),
        form = require('./modules/form.js'),
        contactForm = require('./modules/contactForm.js'),
        slider = require('./modules/slider.js'),
        calc = require('./modules/calc.js');
    
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