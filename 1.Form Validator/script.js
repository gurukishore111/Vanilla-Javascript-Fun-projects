const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Function Show Error:

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const smallElement = formControl.querySelector("small");
  smallElement.innerText = message;
};

//Show Success

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

//Check email:

//From stack overflow =>const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

//Check input Length:

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getMessage(input)} must be atleast ${min} characters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getMessage(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

//Check required

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getMessage(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//Check password match:

const passwordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
};

//Get Message:
const getMessage = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//Checking by passing array of input fields:
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  isValidEmail(email);
  passwordMatch(password, password2);
});
