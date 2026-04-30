/**
 * Login Form Handler
 * Handles form submission with basic validation and fake authentication
 */

document.addEventListener('DOMContentLoaded', initLoginForm);

function initLoginForm() {
  const loginForm = document.querySelector('.login-form');
  
  if (!loginForm) {
    console.warn('Login form not found');
    return;
  }

  // Attach form submit handler
  loginForm.addEventListener('submit', handleLoginSubmit);
  
  // Attach password toggle handler
  const passwordToggle = document.querySelector('.password-toggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', togglePasswordVisibility);
  }

  // Clear errors on input focus
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (emailInput) {
    emailInput.addEventListener('focus', clearFormError);
    emailInput.addEventListener('input', clearFormError);
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('focus', clearFormError);
    passwordInput.addEventListener('input', clearFormError);
  }
}

/**
 * Handle login form submission
 */
function handleLoginSubmit(e) {
  e.preventDefault();
  
  // Get form inputs
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  // Validate inputs exist
  if (!emailInput || !passwordInput) {
    showFormError('Form inputs not found');
    return;
  }
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  // Clear previous errors
  clearFormError();
  
  // Validate empty fields
  if (!email || !password) {
    showFormError('Please fill in all fields');
    return;
  }
  
  // Validate email format
  if (!isValidEmail(email)) {
    showFormError('Please enter a valid email address');
    return;
  }
  
  // Attempt authentication
  if (authenticateUser(email, password)) {
    handleLoginSuccess(email);
  } else {
    showFormError('Invalid email or password');
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Authenticate user (fake authentication with hardcoded credentials)
 */
function authenticateUser(email, password) {
  const validCredentials = {
    email: 'admin@gmail.com',
    password: '1234'
  };
  
  return email === validCredentials.email && password === validCredentials.password;
}

/**
 * Handle successful login with modern UX flow
 */
function handleLoginSuccess(email) {
  // Save user info to localStorage
  localStorage.setItem('user', JSON.stringify({
    email: email,
    loginTime: new Date().toISOString()
  }));
  
  // Log for debugging
  console.log('Login success for:', email);
  
  // Trigger modern success flow
  showModernSuccessFlow();
}

/**
 * Show modern success UX flow with loading → success → redirect
 */
function showModernSuccessFlow() {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'login-success-overlay';
  overlay.innerHTML = `
    <div class="success-flow-container">
      <div class="loading-state">
        <div class="spinner"></div>
        <p class="flow-message">Signing you in...</p>
      </div>
      <div class="success-state" style="display: none;">
        <div class="checkmark-container">
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <p class="flow-message success-message">Success</p>
      </div>
    </div>
  `;
  
  // Add overlay to page
  document.body.appendChild(overlay);
  
  // Trigger fade-in animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 50);
  
  // Phase 1: Show loading state for 2 seconds
  setTimeout(() => {
    updateLoadingMessage('Redirecting...');
  }, 1000);
  
  // Phase 2: Switch to success checkmark after 2.5 seconds
  setTimeout(() => {
    transitionToSuccessState();
  }, 2500);
  
  // Phase 3: Fade out and redirect after 1 more second
  setTimeout(() => {
    fadeOutAndRedirect(overlay);
  }, 3500);
}

/**
 * Update the loading message
 */
function updateLoadingMessage(message) {
  const messageEl = document.querySelector('.loading-state .flow-message');
  if (messageEl) {
    messageEl.textContent = message;
  }
}

/**
 * Transition from loading state to success checkmark
 */
function transitionToSuccessState() {
  const loadingState = document.querySelector('.loading-state');
  const successState = document.querySelector('.success-state');
  
  if (loadingState && successState) {
    // Fade out loading state
    loadingState.style.opacity = '0';
    loadingState.style.transform = 'scale(0.9)';
    
    // Show success state
    setTimeout(() => {
      loadingState.style.display = 'none';
      successState.style.display = 'flex';
      // Trigger checkmark animation
      const checkmark = document.querySelector('.checkmark');
      if (checkmark) {
        checkmark.classList.add('animated');
      }
    }, 200);
  }
}

/**
 * Fade out overlay and redirect to shop
 */
function fadeOutAndRedirect(overlay) {
  overlay.classList.remove('active');
  
  // Redirect after fade completes
  setTimeout(() => {
    window.location.href = 'shop.html';
  }, 300);
}

/**
 * Show form error message (inline below form)
 */
function showFormError(message) {
  // Clear any existing error
  clearFormError();
  
  const loginForm = document.querySelector('.login-form');
  if (!loginForm) return;
  
  // Create error container
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error-container';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.innerHTML = `
    <i class="fas fa-circle-xmark"></i>
    <span>${message}</span>
  `;
  
  // Append error to form (it will be positioned below form via CSS)
  loginForm.appendChild(errorDiv);
  
  // Trigger fade-in animation
  setTimeout(() => {
    errorDiv.classList.add('show');
  }, 10);
  
  // Auto-hide error after 4 seconds
  const errorTimeout = setTimeout(() => {
    clearFormError();
  }, 4000);
  
  // Store timeout ID for manual clearing
  loginForm.dataset.errorTimeout = errorTimeout;
  
  // Log for debugging
  console.log('Form error:', message);
}

/**
 * Clear form error message
 */
function clearFormError() {
  const loginForm = document.querySelector('.login-form');
  if (!loginForm) return;
  
  const errorContainer = loginForm.querySelector('.form-error-container');
  
  if (errorContainer) {
    // Remove show class to trigger fade-out
    errorContainer.classList.remove('show');
    
    // Remove element after animation completes
    setTimeout(() => {
      errorContainer.remove();
    }, 300);
  }
  
  // Clear auto-hide timeout if exists
  if (loginForm.dataset.errorTimeout) {
    clearTimeout(parseInt(loginForm.dataset.errorTimeout));
    delete loginForm.dataset.errorTimeout;
  }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(e) {
  e.preventDefault();
  
  const passwordInput = document.getElementById('password');
  if (!passwordInput) return;
  
  const icon = e.currentTarget.querySelector('i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

