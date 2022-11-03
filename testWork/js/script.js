'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//---------------------------------burger_menu-------------------------------------//
	const burgerBtn = document.querySelector('.burger'),
		  menu = document.querySelector('.menu'),
		  img = document.querySelector('.header__img_left');

	burgerBtn.addEventListener('click', (event) => {
			event.preventDefault();
			menu.classList.toggle('menu_active');
			burgerBtn.classList.toggle('active');
			img.classList.toggle('hide');
			document.body.classList.toggle('menu-opened');
	});
	//---------------------------------------------------------------------------------//

	
	//--------------------------------------Slider-------------------------------------//
	const swiper = new Swiper('.swiper', {
			direction: 'horizontal',
			loop: true,
			scrollbar: {
					el: '.swiper-scrollbar',
			},
			breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					390: {
						slidesPerView: 4,
						spaceBetween: 20
					},
					1200: {
							slidesPerView: 6,
							spaceBetween: 40
						}
			}
	});
	//-------------------------------------------------------------------------------//


	//-----------------------------------Test----------------------------------------//
	const testForm = document.querySelector('.test__wrapper'),
		  startTestBtn = document.querySelector('.starttest__btn'),
		  testQuestion = testForm.querySelector('.test__question'),
		  testAnswers = testForm.querySelectorAll('.test__answer'),
		  step = testForm.querySelector('#step'),
		  parentAnswer = testForm.querySelector('#questions'),
		  indicator = testForm.querySelectorAll('.progressbar__icon'),
		  submitBtn = testForm.querySelector('#btn'),
		  
		  questionsList = {
			'Откуда вы узнали о нас?': [
				'От знакомых', 'Поисковая система', 'Интернет реклама', 'Новости', 'Реклама на улицах', 'Уже работаю с вами'
			],
			'Занимались ли вы когда–то инвестициями?': [
				'Да, занимаюсь постоянно', 'Да, но мало опыта', 'Нет, это мой первый опыт', 'Затрудняюсь ответить'
			],
			'Какой ваш средний заработок за последний квартал?': [
				'Меньше 300.000 тенге', '500.000 тенге', 'Больше 500.000 тенге', 'Затрудняюсь ответить'
			],
			'На какой доход вы рассчитываете выйти?': [
				'500.000 тенге ', '1.000.000 тенге', 'Больше в разы', 'Не уверен(а) в своём ответе'
			],
			'Для доступа к платформе нам необходимо связаться с вами!': [
				'Оставить свои данные для связи', 'В другой раз'
			]
		  },
		  result = {};
	const bgImg = new Image();
	const url = [
		// '../img/test/bg-1.png',
		'../img/test/bg-2.png',
		'../img/test/bg-3.png',
		'../img/test/bg-4.png',
		'../img/test/bg-5.png',
		'../img/test/bg-6.png'
	];


	function loadBgImg(urlIndex) {
		bgImg.src = url[urlIndex];
		bgImg.onload = () => { testForm.style.backgroundImage = `url(${url[urlIndex]})`; };
		
	}

	function removeClass() {
		testForm.querySelectorAll('.test__answer').forEach(item => {
			if (item.matches('li.active')) {
				item.classList.remove('active');
			}
		});
	}

	function openModal() {
		document.querySelector('.test').classList.add('test_active');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		document.querySelector('.test').classList.remove('test_active');
		document.body.style.overflow = '';
		
	}

	function renderQuestion(question, answers) {
		testQuestion.textContent = question;
		
		//видаляємо відповіді з попередньої форми
		if (testForm.querySelector('.test__answer').length != 0) {
			while (parentAnswer.firstChild) {
				parentAnswer.removeChild(parentAnswer.firstChild);
			}
		}

		// створюємо відповіді
		for (let i = 0; i < answers.length; i++) {
			const element = document.createElement('li');
			element.classList.add('test__answer');
			if (answers.length <= 4) {
				parentAnswer.classList.add('test__answers_oneCol');
			}
			element.textContent = answers[i];
			parentAnswer.append(element);
		}
	}

	function renderRegistration() {
		testForm.querySelector('.test__body').remove();
		const element = document.createElement('div');
		element.classList.add('test__body');
		element.innerHTML = `
			<div class="test__registration registration">
				<div class="registration__logo">
					<img src="img/test/test-logo.svg" alt="logo">
				</div>
				<div class="registration__title">Для нас важен каждый наш клиент! </div>
				<div class="registration__subtitle">Чтобы продолжить – заполните форму ниже и ожидайте звонка от нашего менеджера.</div>
				<form class="registration__form" action="#">
					<input name="name" type="text" placeholder="Имя:">
					<input name="surname" type="text" placeholder="Фамилия:">
					<input name="email" type="email" placeholder="Email:">
					<input name="phone" type="tel" placeholder="Телефон:">
					<button type="submit" class="registration__btn">ЗАРЕГИСТИРОВАТЬСЯ</button>
					<div class="registration__text">Пожалуйста, оставайтесь на связи до звонка менеджера.</div>
				</form>	
			</div>
		`;
		testForm.append(element);
		// testForm.querySelector('.registration__form')
		postData(testForm.querySelector('.registration__form'));
	}

	function renderIndicator(indicatorIndex) {
		indicator.forEach(item => {
			// console.log(item.id);
			if (item.id == indicatorIndex) {
				item.classList.add('current');
				step.innerHTML = `Шаг ${indicatorIndex} из 5`;
			}
		});
	}

	function postData(form) {
		form.addEventListener('submit', event => {
			event.preventDefault();
			const formData = new FormData(form);
			formData.forEach((value, key) => {
				result[key] = value;
			});
			// console.log(result);
			setTimeout(() => {
				form.reset();
			}, 2000);
			setTimeout(() => {
				closeModal();
			}, 4000);
		});
	}

	function getData(question) {

		if (testForm.querySelector('.active').textContent == 'Оставить свои данные для связи') {
			// create registration form
			renderRegistration();
		} else if (testForm.querySelector('.active').textContent == 'В другой раз') {
			// return to main page
			closeModal();
			location.reload();
		}

		if (question != 'Для доступа к платформе нам необходимо связаться с вами!') {
			result[question] = testForm.querySelector('.active').textContent;
		}
		
	}
	
	parentAnswer.addEventListener('click', event => {
		removeClass();
		if (event.target && event.target.classList.contains('test__answer')) {
			event.target.classList.toggle('active');
		}
	});

	startTestBtn.addEventListener('click', openModal);
	
	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			closeModal();
			location.reload();
		}
	});

	let questionCounter = 0;
	submitBtn.addEventListener('click', event => {
		questionCounter += 1;
		loadBgImg(questionCounter);
		getData(Object.keys(questionsList)[questionCounter - 1]);
		if (questionCounter != 5) {
			renderQuestion(Object.keys(questionsList)[questionCounter], Object.values(questionsList)[questionCounter]);
			renderIndicator(questionCounter + 1);
		}
	});

	//-------------------------------------------------------------------------------//
});