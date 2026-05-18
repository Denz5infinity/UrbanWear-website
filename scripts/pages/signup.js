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
  signUpWithEmail,
  watchAuthState
} from "../auth/auth-service.js";

document.addEventListener("DOMContentLoaded", initSignupForm);

function initSignupForm() {
  const signupForm = document.querySelector(".signup-form");
  const toggles = document.querySelectorAll(".password-toggle");
  const termsCheckbox = signupForm?.terms;
  const submitButton = signupForm?.querySelector('button[type="submit"]');

  if (!signupForm) return;

  signupForm.noValidate = true;
  syncSignupButtonState(termsCheckbox, submitButton);
  signupForm.addEventListener("submit", handleSignupSubmit);
  signupForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => clearFormMessage(signupForm));
  });

  termsCheckbox.addEventListener("change", () => {
    clearFormMessage(signupForm);
    syncSignupButtonState(termsCheckbox, submitButton);
  });

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", togglePasswordVisibility);
  });

  redirectIfAlreadySignedIn();
}

async function handleSignupSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
    acceptedTerms: form.terms.checked
  };

  clearFormMessage(form);

  const validationError = validateSignupForm(formData);
  if (validationError) {
    showFormMessage(form, validationError);
    return;
  }

  setButtonLoading(submitButton, true, "Creating account...");

  try {
    await signUpWithEmail(formData);
    showFormMessage(form, "Account created. Redirecting...", "success");
    showSuccessOverlay("Creating your account...", getDefaultRedirect());
  } catch (error) {
    showFormMessage(form, getFriendlyAuthError(error));
    setButtonLoading(submitButton, false);
  }
}

function validateSignupForm(data) {
  if (!data.firstName || !data.lastName || !data.email || !data.password || !data.confirmPassword) {
    return "Please fill in all fields.";
  }

  if (!isValidEmail(data.email)) {
    return "Please enter a valid email address.";
  }

  if (data.password.length < 6) {
    return "Your password must be at least 6 characters.";
  }

  if (data.password !== data.confirmPassword) {
    return "Your passwords do not match.";
  }

  if (!data.acceptedTerms) {
    return "Please agree to the terms and conditions.";
  }

  return "";
}

function syncSignupButtonState(termsCheckbox, submitButton) {
  if (!termsCheckbox || !submitButton) return;

  const canSubmit = termsCheckbox.checked;
  submitButton.disabled = !canSubmit;
  submitButton.setAttribute("aria-disabled", String(!canSubmit));
}

function togglePasswordVisibility(event) {
  const button = event.currentTarget;
  const input = button.parentElement.querySelector("input");
  const icon = button.querySelector("i");

  if (!input || !icon) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
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
    const form = document.querySelector(".signup-form");
    showFormMessage(form, error.message);
  }
}
