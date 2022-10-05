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
			alert('Недостатньо даних для розрахунку');
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
			alert('Недостатньо даних для розрахунку');
		}
	});


	//вгадай число міні гра

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
			alert ('спершу натисніть "розпочати гру"');
		} else {
			if (mainFormNumber.number.value >= 1 && mainFormNumber.number.value <= 100 && mainFormNumber.number.value % 1 === 0 && randomNumber) {
				if (randomNumber == mainFormNumber.number.value) {
					alert('гєній');
				} else if (randomNumber > mainFormNumber.number.value) {
					alert('введіть більше число');
				} else {
					alert('введіть менше число');
				}
			} else {
				alert ('введіть ціле число від 1 до 100 включно!');
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

});


 


