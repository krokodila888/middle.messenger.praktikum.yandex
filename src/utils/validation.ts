import { phonePattern, loginPattern, emailPattern, anyLatinLetterPattern, firstNamePattern, anyDigitPattern, anyBigLetterPattern } from './constants';

export function validateItem(i: HTMLInputElement) {
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

export function validateProfileItem(i: HTMLInputElement) {
  let isValid = true;
    /*if (i.name === 'newPassword') {
      isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
    };
    if (i.name === 'oldPassword') {
      isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
    };*/
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

export function validateProfilePasswordItem(i: HTMLInputElement) {
  let isValid = true;
    if (i.name === 'newPassword') {
      isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
    };
    if (i.name === 'oldPassword') {
      isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
    };
    return isValid;
  };

function buttonValidation() {
  let inputsAreValid = true;
  const button = document.querySelector(`.button`);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((item) => {
    if (inputsAreValid) {
      inputsAreValid = validateItem(item);
    };
  });
  if (inputsAreValid) {
    button?.classList.remove('button__disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = false;
    }
  };
  if (!inputsAreValid) {
    button?.classList.add('button__disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = true;
    }
  }
}

function profileButtonValidation() {
  let inputsAreValid = true;
  const button = document.querySelector(`.button__profile`);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((item) => {
    if (inputsAreValid) {
      inputsAreValid = validateProfileItem(item)
    };
  });
  if (inputsAreValid) {

    if (button instanceof HTMLButtonElement) {
      console.log('val')
      button!.classList.remove('button__profile_disabled');
      button!.disabled = false;
    };
  }
  if (!inputsAreValid) {
    
    if (button instanceof HTMLButtonElement) {
      console.log('val')
      button!.classList.add('button__profile_disabled');
      button!.disabled = true;
    }
  }
}

function profilePasswordButtonValidation() {
  let inputsAreValid: boolean = true;
  const button = document.getElementById('newPasswordButton');
  const inputs = [document.getElementById('oldPassword'), document.getElementById('newPassword')];
  inputs.forEach((item) => {
    if (inputsAreValid && item) {
      inputsAreValid = validateProfilePasswordItem(item as HTMLInputElement)
    };
  });
  if (inputsAreValid) {
    button?.classList.remove('input-button__icon_disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = false;
    };
  }
  if (!inputsAreValid) {
    button?.classList.add('input-button__icon_disabled');
    if (button instanceof HTMLButtonElement) {
      button!.disabled = true;
    }
  }
}

export function validate(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    const isValid = validateItem(e.target);
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
    if (e.target!.id === 'oldPassword' || e.target!.id === 'newPassword' ) {
      const isValid = validateProfilePasswordItem(e.target);
      const buttonForPassword = document.getElementById('newPasswordButton') as HTMLButtonElement;

      if (!isValid) {
        document.getElementById(`span_profile_${e.target.name}`)?.classList.add('input-profile-field__span_invalid');
        document.getElementById(`span_profile_${e.target.name}`)?.classList.remove('input-profile-field__span_valid');
        e.target.classList.add('input-profile__invalid');
        buttonForPassword.classList.add('input-button__icon_disabled');
        if (buttonForPassword instanceof HTMLButtonElement) {
          buttonForPassword!.disabled = true;
        }
      }
      else {
        document.getElementById(`span_profile_${e.target.name}`)?.classList.remove('input-profile-field__span_invalid');
        document.getElementById(`span_profile_${e.target.name}`)?.classList.add('input-profile-field__span_valid');
        e.target.classList.remove('input-profile__invalid');
        profilePasswordButtonValidation()
      }
    } else {
      const isValid = validateProfileItem(e.target);
      if (!isValid) {
        document.getElementById(`span_profile_${e.target.name}`)?.classList.add('input-profile-field__span_invalid');
        document.getElementById(`span_profile_${e.target.name}`)?.classList.remove('input-profile-field__span_valid');
        e.target.classList.add('input-profile__invalid');
        document.querySelector(`button`)?.classList.add('button__profile_disabled');
        const button = document.querySelector(`.button__profile`);
        if (button instanceof HTMLButtonElement) {
          button!.disabled = true;
        }
      }
      else {
        document.getElementById(`span_profile_${e.target.name}`)?.classList.remove('input-profile-field__span_invalid');
        document.getElementById(`span_profile_${e.target.name}`)?.classList.add('input-profile-field__span_valid');
        e.target.classList.remove('input-profile__invalid');
        profileButtonValidation()
      }
    }
  }
};

export function validateProfilePassword(e: Event, i: HTMLInputElement) {
  console.log(e);
  if (i instanceof HTMLInputElement) {
    const isValid = validateProfileItem(i);
    const buttonForPassword = document.getElementById('newPasswordButton') as HTMLButtonElement;
    console.log(buttonForPassword);
    if (!isValid) {
      document.getElementById(`span_profile_${i.name}`)?.classList.add('input-profile-field__span_invalid');
      document.getElementById(`span_profile_${i.name}`)?.classList.remove('input-profile-field__span_valid');
      i.classList.add('input-profile__invalid');
      buttonForPassword?.classList.add('input-button__icon_disabled');
      buttonForPassword!.disabled = true;
    }
    else {
      document.getElementById(`span_profile_${i.name}`)?.classList.remove('input-profile-field__span_invalid');
      document.getElementById(`span_profile_${i.name}`)?.classList.add('input-profile-field__span_valid');
      i.classList.remove('input-profile__invalid');
      buttonForPassword?.classList.remove('input-button__icon_disabled');
      buttonForPassword!.disabled = false;
    }
  }
};
