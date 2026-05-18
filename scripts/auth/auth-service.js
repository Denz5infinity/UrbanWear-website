import {
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirebaseAuth } from "../firebase/firebase-config.js";

export function watchAuthState(callback) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function signUpWithEmail({ firstName, lastName, email, password }) {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim();

  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }

  return credential.user;
}

export async function loginWithEmail(email, password, rememberUser = false) {
  const auth = getFirebaseAuth();
  const persistence = rememberUser ? browserLocalPersistence : browserSessionPersistence;

  await setPersistence(auth, persistence);

  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(getFirebaseAuth());
}

export async function sendResetEmail(email) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}

export function getFriendlyAuthError(error) {
  const code = error?.code || "";

  const messages = {
    "auth/email-already-in-use": "That email is already registered. Try signing in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/user-not-found": "No account was found with that email.",
    "auth/wrong-password": "The password is incorrect.",
    "auth/weak-password": "Please choose a stronger password with at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Network issue. Check your connection and try again.",
    "auth/configuration-not-found": "Firebase Authentication is not enabled for this project yet. Enable Email/Password sign-in in Firebase Console."
  };

  return messages[code] || error?.message || "Something went wrong. Please try again.";
}

export function getDefaultRedirect() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "./shop.html";
}
