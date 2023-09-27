let search = document.querySelector('.header__search-btn');
let searchForm = document.querySelector('.header__search');
let searchClosed = document.querySelector('.header__search-btn_close');

search.addEventListener('click', function() {
    searchForm.classList.toggle('header__search--active');
    search.classList.remove('header__search-btn--active');
})

searchClosed.addEventListener('click', function() {
    searchForm.classList.remove('header__search--active');
    search.classList.toggle('header__search-btn--active');
})


const inputForm = document.querySelector('#email-field');
const validate = new window.JustValidate('#form');
// const container = document.querySelector('.#email-fiels');

validate
  .addField(inputForm, [
    {
      rule: 'required',
      errorMessage: 'Недопустимый формат',
      errorsContainer: inputForm,
    },
    {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
        errorsContainer: inputForm,
    },
]);



let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__bottom');
let navMenu = document.querySelector('.header__bottom-nav');
let menuLinks = navMenu.querySelectorAll('.header__bottom-item');
let tel = document.querySelector('.burger__tel');

burger.addEventListener('click',
function() {
    burger.classList.toggle('burger-active');
    menu.classList.toggle('active');
    tel.style.display='block';
    navMenu.classList.toggle('burger__nav');
    menuLinks.forEach(function (el) {
        el.classList.toggle('burger__nav--item');
    })
})

// menuLinks.forEach(function (el) {
//     el.addEventListener('click', function (){
//         burger.classList.remove('burger--active');
//         menu.classList.remove('header__nav--active');
//         document.body.classList.remove('stop-scroll');
//     })
// })
