import { phonePattern, loginPattern, emailPattern, anyLatinLetterPattern, firstNamePattern, anyDigitPattern, anyBigLetterPattern } from './constants';

function validateItem(i: HTMLInputElement) {
  let isValid = true;
    if (i.name === 'password') {
      isValid = (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value))
    };
    if (i.name === 'login') {
      isValid = (i.validity.valid && anyLatinLetterPattern.test(i.value) && loginPattern.test(i.value))
    };
    if (i.name === 'first_name') {
      isValid = (i.validity.valid && firstNamePattern.test(i.value))
    };
    if (i.name === 'second_name') {
      isValid = (i.validity.valid && firstNamePattern.test(i.value))
    };
    if (i.name === 'phone') {
      isValid = (i.validity.valid && phonePattern .test(i.value))
    };
    if (i.name === 'email') {
      isValid = (i.validity.valid && emailPattern.test(i.value))
    };
  return isValid;
}

function validateProfileItem(i: HTMLInputElement) {
  let isValid = true;
    if (i.name === 'profile_newPassword') {
      isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
    };
    if (i.name === 'profile_login') {
      isValid = (i.validity.valid && anyLatinLetterPattern.test(i.value) && loginPattern.test(i.value))
    };
    if (i.name === 'profile_first_name') {
      isValid = (i.validity.valid && firstNamePattern.test(i.value))
    };
    if (i.name === 'profile_second_name') {
      isValid = (i.validity.valid && firstNamePattern.test(i.value))
    };
    if (i.name === 'profile_phone') {
      isValid = (i.validity.valid && phonePattern .test(i.value))
    };
    if (i.name === 'profile_email') {
      isValid = (i.validity.valid && emailPattern.test(i.value))
    };
  return isValid;
}

function buttonValidation() {
  let inputsAreValid = true;
  let button = document.querySelector(`.button`);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((item) => {
    if (inputsAreValid) {
      inputsAreValid = validateItem(item);
    };
  });
  if (inputsAreValid) {
    console.log("yes");
    button?.classList.remove('button__disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = false;
    }
  };
  if (!inputsAreValid) {
    console.log("no");
    button?.classList.add('button__disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = true;
    }
  }
}

function profileButtonValidation() {
  let inputsAreValid = true;
  let button = document.querySelector(`.button__profile`);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((item) => {
    if (inputsAreValid) {
      inputsAreValid = validateProfileItem(item)
    };
  });
  if (inputsAreValid) {
    button?.classList.remove('button__profile_disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = false;
    };
  }
  if (!inputsAreValid) {
    button?.classList.add('button__profile_disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = true;
    }
  }
}

export function validate(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    let isValid = validateItem(e.target);
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
      buttonValidation()
    }
  }
};

export function validateProfile(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    let isValid = validateProfileItem(e.target);

    if (!isValid) {
      document.getElementById(`span_${e.target.name}`)?.classList.add('input-profile-field__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.remove('input-profile-field__span_valid');
      e.target.classList.add('input-profile__invalid');
      document.querySelector(`button`)?.classList.add('button__profile_disabled');
      let button = document.querySelector(`.button__profile`);
      if (button instanceof HTMLButtonElement) {
        button!.disabled = true;
      }
    }
    else {
      document.getElementById(`span_${e.target.name}`)?.classList.remove('input-profile-field__span_invalid');
      document.getElementById(`span_${e.target.name}`)?.classList.add('input-profile-field__span_valid');
      e.target.classList.remove('input-profile__invalid');
      profileButtonValidation()
    }
  }
};

