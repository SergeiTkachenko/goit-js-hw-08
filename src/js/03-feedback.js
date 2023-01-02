import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const KEY_LOCAL_DATA = 'feedback-form-state';
let localValueObj = {};

initForm();

formEl.addEventListener('input', e => {
  localValueObj[e.target.name] = e.target.value;

  localStorage.setItem(KEY_LOCAL_DATA, JSON.stringify(localValueObj));
});

function initForm() {
  let localFormValue = localStorage.getItem(KEY_LOCAL_DATA);
  if (localFormValue) {
    localFormValue = JSON.parse(localFormValue);
    Object.entries(localFormValue).forEach(([name, value]) => {
      localValueObj[name] = value;
      formEl.elements[name].value = value;
    });
  }
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(KEY_LOCAL_DATA);
  console.log(localValueObj);
  localValueObj = {};
});

//////////////////////// old code //////////////////////////////////////

// const form = document.querySelector('.feedback-form');

// form.addEventListener('input', throttle(onInput, 500));
// form.addEventListener('submit', onClickButton);

// const KEY_LOCAL_DATA = 'feedback-form-state';
// const valueLocalStorage = localStorage.getItem(KEY_LOCAL_DATA);
// const parsedLocalStorage = JSON.parse(valueLocalStorage);

// saveInput();

// function onInput(e) {
//   localStorage.setItem(
//     KEY_LOCAL_DATA,
//     JSON.stringify({
//       email: form.elements.email.value,
//       message: form.elements.message.value,
//     })
//   );
// }

// function saveInput() {
//   if (valueLocalStorage) {
//     form.elements.email.value = parsedLocalStorage.email || '';
//     form.elements.message.value = parsedLocalStorage.message || '';
//   }
// }

// function onClickButton(e) {
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem(KEY_LOCAL_DATA);
//   console.log(parsedLocalStorage);
// }
