import { getFriendlyAuthError, logoutUser, watchAuthState } from "../auth/auth-service.js";

const loginPath = "./login.html?redirect=./dashboard.html";

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("header h1");
  const logoutLink = Array.from(document.querySelectorAll("aside a")).find((link) =>
    link.textContent.trim().toLowerCase() === "logout"
  );

  if (logoutLink) {
    logoutLink.href = "#";
    logoutLink.addEventListener("click", handleLogout);
  }

  try {
    watchAuthState((user) => {
      if (!user) {
        window.location.href = loginPath;
        return;
      }

      if (heading) {
        const name = user.displayName || user.email?.split("@")[0] || "there";
        heading.textContent = `Welcome Back, ${name}`;
      }
    });
  } catch (error) {
    if (heading) {
      heading.textContent = error.message;
    }
  }
});

async function handleLogout(event) {
  event.preventDefault();

  try {
    await logoutUser();
    window.location.href = "../index.html";
  } catch (error) {
    alert(getFriendlyAuthError(error));
  }
}
