const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return emailPattern.test(email);
}

export function showFormMessage(form, message, type = "error") {
  clearFormMessage(form);

  const messageBox = document.createElement("div");
  messageBox.className = `form-feedback form-feedback--${type}`;
  messageBox.setAttribute("role", type === "error" ? "alert" : "status");
  messageBox.innerHTML = `
    <i class="fas ${type === "error" ? "fa-circle-xmark" : "fa-circle-check"}"></i>
    <span>${message}</span>
  `;

  form.appendChild(messageBox);
  requestAnimationFrame(() => messageBox.classList.add("show"));
}

export function clearFormMessage(form) {
  const oldMessage = form?.querySelector(".form-feedback");
  if (oldMessage) {
    oldMessage.remove();
  }
}

export function setButtonLoading(button, isLoading, loadingText) {
  if (!button) return;

  if (!button.dataset.defaultText) {
    button.dataset.defaultText = button.textContent.trim();
  }

  button.disabled = isLoading;
  button.classList.toggle("is-loading", isLoading);
  button.innerHTML = isLoading
    ? `<span class="button-spinner" aria-hidden="true"></span>${loadingText}`
    : button.dataset.defaultText;
}

export function showSuccessOverlay(message, redirectUrl) {
  const overlay = document.createElement("div");
  overlay.className = "login-success-overlay";
  overlay.innerHTML = `
    <div class="success-flow-container">
      <div class="loading-state">
        <div class="spinner"></div>
        <p class="flow-message">${message}</p>
      </div>
      <div class="success-state" style="display: none;">
        <div class="checkmark-container">
          <svg class="checkmark" viewBox="0 0 52 52" aria-hidden="true">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"></circle>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
          </svg>
        </div>
        <p class="flow-message flow-success-message">Success</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("active"));

  setTimeout(() => {
    overlay.querySelector(".loading-state").style.display = "none";
    overlay.querySelector(".success-state").style.display = "flex";
    overlay.querySelector(".checkmark").classList.add("animated");
  }, 700);

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 1400);
}
