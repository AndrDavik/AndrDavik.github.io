

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

//-------------------------------Swipe menu-----------------------------------//
const mc = new Hammer(document.body);

mc.on("swipeleft swiperight", function(ev) {
    console.log('aaaaa');
    if(ev.type === "swipeleft") {
        menu.classList.remove('active');
    }
    else {
        menu.classList.add('active');
    }
});
//-----------------------------------------------------------------------------//

const counters = document.querySelectorAll('.skills__ratings-counter');
const lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


//Smooth scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

//Sending emails
const forms = () =>{ 
    const form = document.querySelector('form'),
        inputs = document.querySelectorAll('input');
 
 
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };
 
    const postData = async(url, data) =>{
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
 
        return await res.text();
    };
 
    //переменная с функцией по очистке input
    const clearInput = () =>{
        inputs.forEach(item =>{
            item.value = '';
        });
    };
 
 
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault(); 
 
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage); 
 
 
        const formData = new FormData(form);
 
        postData('mailer/smart.php', formData)
        .then(res =>{
            console.log(res);
            statusMessage.textContent= message.success;
        })
        .catch ( ()=>{
            statusMessage.textContent= message.failure;
        })
        .finally ( ()=>{
            clearInput();
            setTimeout ( ()=>{
                statusMessage.remove();
            },5000);
        });
 
 
    });
    
};
 
forms();        
