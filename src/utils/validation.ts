import { phonePattern, loginPattern, emailPattern, anyLatinLetterPattern, firstNamePattern, anyDigitPattern, anyBigLetterPattern } from './constants'

export function validate(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    let isValid;
    if (e.target.name === 'password') {
      isValid = (e.target.validity.valid && anyBigLetterPattern.test(e.target.value) && anyDigitPattern.test(e.target.value))
    };
    if (e.target.name === 'login' && anyLatinLetterPattern.test(e.target.value) && loginPattern.test(e.target.value)) {
      isValid = (e.target.validity.valid)
    };
    if (e.target.name === 'first_name') {
      isValid = (e.target.validity.valid && firstNamePattern.test(e.target.value))
    };
    if (e.target.name === 'second_name') {isValid = (e.target.validity.valid && firstNamePattern.test(e.target.value))
    };
    if (e.target.name === 'phone') {
      isValid = (e.target.validity.valid && phonePattern .test(e.target.value))
    };
    if (e.target.name === 'email') {
      isValid = (e.target.validity.valid && emailPattern.test(e.target.value))
    };
    if (!isValid) {
      document.getElementById(`span_${e.target.name}`)?.classList.add('inputfield__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.remove('inputfield__span_valid');
      e.target.classList.add('input__invalid');
      document.querySelector(`button`)?.classList.add('button__disabled');
      if (document.querySelector(`button`) instanceof HTMLButtonElement) {
        document.querySelector(`button`)!.disabled = true;
      }
    }
    else {
      document.getElementById(`span_${e.target.name}`)?.classList.remove('inputfield__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.add('inputfield__span_valid');
      e.target.classList.remove('input__invalid');
      /*document.querySelector(`button`)?.classList.remove('button__disabled');
      if (document.querySelector(`button`) instanceof HTMLButtonElement) {
        document.querySelector(`button`)!.disabled = false;
      }*/
    }
  }
};

export function validateProfile(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    let isValid;
    if (e.target.name === 'profile_newPassword') {
      isValid = (e.target.value === '' || (e.target.validity.valid && anyBigLetterPattern.test(e.target.value) && anyDigitPattern.test(e.target.value)))
    };
    if (e.target.name === 'profile_login' && anyLatinLetterPattern.test(e.target.value) && loginPattern.test(e.target.value)) {
      isValid = (e.target.validity.valid)
    };
    if (e.target.name === 'profile_first_name') {
      console.log('ggg')
      isValid = (e.target.validity.valid && firstNamePattern.test(e.target.value))
    };
    if (e.target.name === 'profile_second_name') {
      isValid = (e.target.validity.valid && firstNamePattern.test(e.target.value))
    };
    if (e.target.name === 'profile_phone') {
      isValid = (e.target.validity.valid && phonePattern .test(e.target.value))
    };
    if (e.target.name === 'profile_email') {
      isValid = (e.target.validity.valid && emailPattern.test(e.target.value))
    };
    if (!isValid) {
      document.getElementById(`span_${e.target.name}`)?.classList.add('input-profile-field__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.remove('input-profile-field__span_valid');
      e.target.classList.add('input-profile__invalid');
      document.querySelector(`button`)?.classList.add('button__disabled');
      if (document.querySelector(`button`) instanceof HTMLButtonElement) {
        document.querySelector(`button`)!.disabled = true;
      }
    }
    else {
      document.getElementById(`span_${e.target.name}`)?.classList.remove('input-profile-field__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.add('input-profile-field__span_valid');
      e.target.classList.remove('input-profile__invalid');
      /*document.querySelector(`button`)?.classList.remove('button__disabled');
      if (document.querySelector(`button`) instanceof HTMLButtonElement) {
        document.querySelector(`button`)!.disabled = false;
      }*/
    }
  }
};
