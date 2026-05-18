import {
  clearFormMessage,
  isValidEmail,
  setButtonLoading,
  showFormMessage
} from "../auth/form-utils.js";
import { getFriendlyAuthError, sendResetEmail } from "../auth/auth-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".reset-form");
  if (!form) return;

  form.noValidate = true;
  form.addEventListener("submit", handlePasswordReset);
  form.email.addEventListener("input", () => clearFormMessage(form));
});

async function handlePasswordReset(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const email = form.email.value.trim();

  clearFormMessage(form);

  if (!email) {
    showFormMessage(form, "Please enter your email address.");
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage(form, "Please enter a valid email address.");
    return;
  }

  setButtonLoading(button, true, "Sending...");

  try {
    await sendResetEmail(email);
    showFormMessage(form, "Password reset email sent. Check your inbox.", "success");
    form.reset();
  } catch (error) {
    showFormMessage(form, getFriendlyAuthError(error));
  } finally {
    setButtonLoading(button, false);
  }
}
