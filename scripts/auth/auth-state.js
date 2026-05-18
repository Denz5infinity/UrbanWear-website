import { getFriendlyAuthError, logoutUser, watchAuthState } from "./auth-service.js";

const pageRoot = window.location.pathname.includes("/Pages/");
const paths = {
  home: pageRoot ? "../index.html" : "index.html",
  shop: pageRoot ? "./shop.html" : "Pages/shop.html",
  login: pageRoot ? "./login.html" : "Pages/login.html",
  signup: pageRoot ? "./signup.html" : "Pages/signup.html",
  dashboard: pageRoot ? "./dashboard.html" : "Pages/dashboard.html"
};

function renderSignedOut(navActions) {
  navActions.innerHTML = `
    <a href="${paths.login}" class="btn-primary">Login</a>
    <a href="${paths.signup}" class="btn-secondary">Sign Up</a>
  `;
}

function renderSignedIn(navActions, user) {
  const name = user.displayName || user.email?.split("@")[0] || "Account";

  navActions.innerHTML = `
    <a href="${paths.dashboard}" class="auth-user" title="${user.email || "Account"}">
      <span>${name}</span>
    </a>
    <button type="button" class="auth-logout" data-auth-logout>
      <span>Logout</span>
    </button>
  `;

  navActions.querySelector("[data-auth-logout]").addEventListener("click", async () => {
    const logoutButton = navActions.querySelector("[data-auth-logout]");
    logoutButton.disabled = true;

    try {
      await logoutUser();
      window.location.href = paths.home;
    } catch (error) {
      logoutButton.disabled = false;
      alert(getFriendlyAuthError(error));
    }
  });
}

function renderShopSignedOut(navActions) {
  navActions.querySelectorAll(".auth-user, .auth-logout").forEach((item) => item.remove());

  if (!navActions.querySelector('a[href$="login.html"]')) {
    const loginLink = document.createElement("a");
    loginLink.href = paths.login;
    loginLink.className = "btn-primary";
    loginLink.textContent = "Login";
    navActions.insertBefore(loginLink, navActions.querySelector(".cart-icon"));
  }
}

function renderShopSignedIn(navActions, user) {
  navActions.querySelector('a[href$="login.html"]')?.remove();
  navActions.querySelectorAll(".auth-user, .auth-logout").forEach((item) => item.remove());

  const name = user.displayName || user.email?.split("@")[0] || "Account";
  const accountLink = document.createElement("a");
  accountLink.href = paths.dashboard;
  accountLink.className = "auth-user";
  accountLink.title = user.email || "Account";
  accountLink.innerHTML = `<span>${name}</span>`;

  const logoutButton = document.createElement("button");
  logoutButton.type = "button";
  logoutButton.className = "auth-logout";
  logoutButton.innerHTML = `<span>Logout</span>`;
  logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;

    try {
      await logoutUser();
      window.location.href = paths.home;
    } catch (error) {
      logoutButton.disabled = false;
      alert(getFriendlyAuthError(error));
    }
  });

  const cartIcon = navActions.querySelector(".cart-icon");
  navActions.insertBefore(accountLink, cartIcon);
  navActions.insertBefore(logoutButton, cartIcon);
}

function initNavbarAuthState() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  const persistentShopControls = navActions.querySelector(".search-bar, .cart-icon, .wishlist-icon");
  if (persistentShopControls) {
    watchAuthState((user) => {
      if (user) {
        renderShopSignedIn(navActions, user);
        return;
      }

      renderShopSignedOut(navActions);
    });
    return;
  }

  watchAuthState((user) => {
    if (user) {
      renderSignedIn(navActions, user);
      return;
    }

    renderSignedOut(navActions);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initNavbarAuthState();
  } catch (error) {
    console.warn(error.message);
  }
});
