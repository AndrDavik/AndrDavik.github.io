"use strict";

window.addEventListener('DOMContentLoaded', () => {
	const btn1 = document.querySelector('#btn1');

	//площа прямокутника константи
	const mainForm = document.forms.mainForm;

	//повна площа і обєм куба константи
	const mainFormQube = document.forms.mainFormQube;


	btn1.addEventListener("click", function(e){
		e.preventDefault();

		//перевірка на заповненість полів
		if (mainForm.inputWidth.value != '' && mainForm.inputHeight.value != '') {
			//розрахунок площі прямокутника
			mainForm.inputResult.value = mainForm.inputWidth.value * mainForm.inputHeight.value;
		} else {
			openModal(modalText.insufficientData);
		}
	});

	const btn2 = document.querySelector('#btn2');

	btn2.addEventListener("click", function(e) {
		e.preventDefault();

		//перевірка на заповненість полів
		if (mainFormQube.sideLenght.value != '') {
			//розрахунок повної площі та обєму куба
			mainFormQube.inputResultVolume.value = Math.pow(mainFormQube.sideLenght.value, 3);
			mainFormQube.inputResultArea.value = Math.pow(mainFormQube.sideLenght.value, 2) * 6;
		} else {
			openModal(modalText.insufficientData);
		}
	});



	//-----------------------------Modal----------------------------//
	const modal = document.querySelector('.modal');
	const modalText = {
		startGame: 'спершу натисніть "розпочати гру"',
		winGame: 'гєній',
		largerNum: 'введіть більше число',
		smallerNum: 'введіть менше число',
		wrongNum: 'введіть ціле число від 1 до 100 включно!',
		insufficientData: 'Недостатньо даних для розрахунку'
	};



	function openModal(text) {
		modal.classList.add('modal__active');
		modal.querySelector('.modal__text').textContent = text;
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modal.classList.remove('modal__active');
		document.body.style.overflow = '';
	}


	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('modal__active')) {
			closeModal();
		}
	});

	//--------------------------------------------------------------//



	//---------------------вгадай число міні гра--------------------//

	// Math.floor(Math.random()*100) - диапазон от 0 до 99
	// Math.round(Math.random()*100) - диапазон от 0 до 100
	// Math.ceil(Math.random()*100) - диапазон от 1 до 100

	const btnNumber = document.querySelector('#btnNumber');
	const btnStartGame = document.querySelector('#btnStartGame');
	const mainFormNumber = document.forms.mainFormNumber;

	let randomNumber;

	btnStartGame.addEventListener('click', (e) => {
		e.preventDefault();
		randomNumber = null;
		randomNumber = Math.ceil(Math.random() * 100);
		console.log(randomNumber);
	});


	btnNumber.addEventListener('click', (e) => {
		e.preventDefault();
		if (randomNumber == null) {
			openModal(modalText.startGame);
		} else {
			if (mainFormNumber.number.value >= 1 && mainFormNumber.number.value <= 100 && mainFormNumber.number.value % 1 === 0 && randomNumber) {
				if (randomNumber == mainFormNumber.number.value) {
					openModal(modalText.winGame);
				} else if (randomNumber > mainFormNumber.number.value) {
					openModal(modalText.largerNum);
				} else {
					openModal(modalText.smallerNum);
				}
			} else {
				openModal(modalText.wrongNum);
			}
		}
	});


	//-------------GAME---------------//

	const btnGame = document.querySelector('#btnGame');
	const gameArea = document.querySelector('.game__area');


	

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function cellsCelection() {
		const result = [];
		const arrId = [];
		for (let i = 0; i < 100; i++) {
			arrId.push(i+1);
		}
		shuffle(arrId);
		for (let i = 0; i < 10; i++) {
			result.push(arrId[i]);
		}
		return result;
	}

	
	
	//створюємо змінну в яку буде передано масив з обраними блоками
	let arrCells;

	btnGame.addEventListener('click', (e) => {
		e.preventDefault();

		//видаляємо елементи, якщо вони вже створені
		if (document.querySelectorAll('.game__item').length != 0) {
			while (gameArea.firstChild) {
				gameArea.removeChild(gameArea.firstChild);
			}
		} 

		//створюємо елементи
		for (let i = 0; i < 100; i++) {
			const div = document.createElement('div');
			div.classList.add('game__item');
			div.id = i+1;
			document.querySelector('.game__area').append(div);
		}

		gameArea.classList.add('game__area_active');

		arrCells = cellsCelection();
		
	});
	
	gameArea.addEventListener('click', (event) => {
		if (event.target && event.target.matches('div.game__item')) {

			if (arrCells.includes(+event.target.id)) {
				event.target.classList.add('game__item_yes');
			} else {
				event.target.classList.add('game__item_no');
			}
		}
		
	});



	//--------------------Екранна клавіатура-------------------------//
	let area = document.querySelector('#area');
	let keys = document.querySelectorAll('.keyboard__item');
	[...keys].forEach(item => {
		item.addEventListener('click', event => {
			const action = event.target.dataset.action;
			area.value += String.fromCharCode(action);
		});
	});
	//---------------------------------------------------------------//



	//-------------------------Календар------------------------------//
	const calendarItems = document.querySelector('.calendar__items');
	const now = new Date();

	//кількість днів в місяці
	// function howMuchDays(year , month) {
	// 	let date1 = new Date(year, month-1, 1);
	// 	let date2 = new Date(year, month, 1);
	// 	return Math.round((date2 - date1) / 1000 / 3600 / 24); 
	// }

	// function getDay() {
	// 	let days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота'];
	// 	return days[now.getDay()];
	// }

	// function getMonth() {
	// 	let monthName = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
	// 	return monthName[now.getMonth()];
	// }

	function Calendar(id, year, month) {
		let Dlast = new Date(year,month+1,0).getDate(),
			D = new Date(year,month,Dlast),
			DNlast = D.getDay(),
			DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
			calendar = '<tr>',
			m = document.querySelector('#'+id+' option[value="' + D.getMonth() + '"]'),
			g = document.querySelector('#'+id+' input');
	
		if (DNfirst != 0) {
			for(let i = 1; i < DNfirst; i++) {
				calendar += '<td>';
			}
		}else{
			for(let i = 0; i < 6; i++) {
				calendar += '<td>';
			}
		}
	
		for(let i = 1; i <= Dlast; i++) {
			  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
				calendar += '<td class="today">' + i;
			  }else{
				if (  // новий рік та 8 березня
					(i == 1 && D.getMonth() == 0 && ((D.getFullYear() > 1897 && D.getFullYear() < 1930) || D.getFullYear() > 1947)) ||
					(i == 2 && D.getMonth() == 0 && D.getFullYear() > 1992) ||
					((i == 3 || i == 4 || i == 5 || i == 6 || i == 8) && D.getMonth() == 0 && D.getFullYear() > 2004) ||
					(i == 7 && D.getMonth() == 0 && D.getFullYear() > 1990)
				) {
					  calendar += '<td class="holiday">' + i;
				}else{
					  calendar += '<td>' + i;
				}
			  }
	
			if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
				calendar += '<tr>';
			}
		}
	
		for (let i = DNlast; i < 7; i++) {
			calendar += '<td>&nbsp;';
		}
	
		document.querySelector('#'+id+' tbody').innerHTML = calendar;
		g.value = D.getFullYear();
		m.selected = true;
	
		if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {
			document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
		}
		
		// в списку виділений поточний місяц
		document.querySelector('#'+id+' option[value="' + new Date().getMonth() + '"]').style.color = 'rgb(220, 0, 0)';
	}
	
	Calendar("calendar",new Date().getFullYear(),new Date().getMonth());
	
	document.querySelector('#calendar').onchange = function Kalendar3() {
		Calendar("calendar",document.querySelector('#calendar input').value,parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value));
	};

	//---------------------------------------------------------------//



	//-----------------------------tabs------------------------------//
	const tabs = document.querySelectorAll('.tabs__item'),
		  tabsContent = document.querySelectorAll('.tabs__content'),
		  tabsParent = document.querySelector('.tabs__items');


	function hideTabsContent() {
		tabsContent.forEach((elem) => {
			elem.classList.add('tabs__content_hide');
			elem.classList.remove('tabs__content_show');
		});	
		tabs.forEach((elem) => {
			elem.classList.remove('tabs__item_active');
		});
	}

	function showTabsContent(i = 0) {
		tabsContent[i].classList.add('tabs__content_show');
		tabsContent[i].classList.remove('tabs__content_hide');
		tabs[i].classList.add('tabs__item_active');
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabs__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabsContent();
					showTabsContent(i);	
				}
			});
		}
	});
	//---------------------------------------------------------------//



	//------------------------------API------------------------------//
	const eur = document.querySelector('#eur'),
      	  usd = document.querySelector('#usd'),
		  gbp = document.querySelector('#gbp'),
		  loadBtn = document.querySelector('.currencies__btn');

	function getCurrencies() {
		fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
		.then(response => response.json())
		.then(json => {
            const arr = Array.from(JSON.parse(JSON.stringify(json)))
            .filter(item => {
                if (item.cc === 'USD' || item.cc === 'EUR' || item.cc === 'GBP') {
                    return item;
                }
            });
            console.log(arr);
			arr.forEach(item => {
                if (item.cc === 'USD') {
                    usd.innerHTML = item.rate.toFixed(2);
                } else if (item.cc === 'EUR') {
                    eur.innerHTML = item.rate.toFixed(2);
                } else if (item.cc === 'GBP') {
                    gbp.innerHTML = item.rate.toFixed(2);
                }
            });
        })
        .catch(() => {
            console.log('error');
        });
	}

	loadBtn.addEventListener('click', (event) => {
		event.preventDefault();
		getCurrencies();
	});

	//---------------------------------------------------------------//



	//-----------------------------Facts-----------------------------//
	const inputDay = document.querySelector('#inputDay'),
		  inputMonths = document.querySelector('#inputMonths'),
		  factResult = document.querySelector('#factResult'),
		  factsBtn = document.querySelector('.facts__btn');

	function getFact() {
		fetch(`http://numbersapi.com/${inputMonths.value}/${inputDay.value}/date`)
		.then(response => response.text())
		.then(text => {
			if (inputDay.value == 24 && inputMonths.value == 2) {
				factResult.textContent = 'В цей день, 2022 року, о 4-й годині ранку хтиві підараси розпочали повномаштабну війну проти України';
			} else {
				factResult.textContent = text;
			}
		})
		.catch(() => factResult.textContent = 'Некоректні дані');
	}

	factsBtn.addEventListener('click', (event) => {
		event.preventDefault();
		getFact();
	});


	//---------------------------------------------------------------//
});



 


