import {
  clearFormMessage,
  isValidEmail,
  setButtonLoading,
  showFormMessage,
  showSuccessOverlay
} from "../auth/form-utils.js";
import {
  getDefaultRedirect,
  getFriendlyAuthError,
  loginWithEmail,
  watchAuthState
} from "../auth/auth-service.js";

document.addEventListener("DOMContentLoaded", initLoginForm);

function initLoginForm() {
  const loginForm = document.querySelector(".login-form");
  const passwordToggle = document.querySelector(".password-toggle");

  if (!loginForm) return;

  loginForm.noValidate = true;
  loginForm.addEventListener("submit", handleLoginSubmit);
  loginForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => clearFormMessage(loginForm));
  });

  if (passwordToggle) {
    passwordToggle.addEventListener("click", togglePasswordVisibility);
  }

  redirectIfAlreadySignedIn();
}

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const email = form.email.value.trim();
  const password = form.password.value;
  const rememberUser = form.remember.checked;

  clearFormMessage(form);

  const validationError = validateLoginForm(email, password);
  if (validationError) {
    showFormMessage(form, validationError);
    return;
  }

  setButtonLoading(submitButton, true, "Signing in...");

  try {
    await loginWithEmail(email, password, rememberUser);
    showFormMessage(form, "Signed in successfully. Redirecting...", "success");
    showSuccessOverlay("Signing you in...", getDefaultRedirect());
  } catch (error) {
    showFormMessage(form, getFriendlyAuthError(error));
    setButtonLoading(submitButton, false);
  }
}

function validateLoginForm(email, password) {
  if (!email || !password) {
    return "Please fill in both your email and password.";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < 6) {
    return "Your password must be at least 6 characters.";
  }

  return "";
}

function togglePasswordVisibility(event) {
  const passwordInput = document.getElementById("password");
  const icon = event.currentTarget.querySelector("i");

  if (!passwordInput || !icon) return;

  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye", !isHidden);
  icon.classList.toggle("fa-eye-slash", isHidden);
}

function redirectIfAlreadySignedIn() {
  try {
    watchAuthState((user) => {
      if (user) {
        window.location.href = getDefaultRedirect();
      }
    });
  } catch (error) {
    const form = document.querySelector(".login-form");
    showFormMessage(form, error.message);
  }
}
