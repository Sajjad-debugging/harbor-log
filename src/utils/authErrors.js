const messages = {
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/missing-password": "Enter a password to continue.",
  "auth/weak-password": "Choose a password with at least 6 characters.",
  "auth/email-already-in-use": "An account with this email already exists. Try logging in instead.",
  "auth/user-not-found": "No account found for this email.",
  "auth/wrong-password": "Incorrect password. Try again.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed": "Can't reach Firebase. Check your internet connection.",
  "auth/operation-not-allowed": "Email/Password sign-in is turned off. Enable it in Firebase Console under Authentication, then Sign-in method.",
  "auth/configuration-not-found": "Authentication isn't set up yet. Click Get started in Firebase Console under Authentication.",
  "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "The Firebase API key in .env is not valid.",
  "auth/invalid-api-key": "The Firebase API key in .env is not valid.",
};

export function friendlyAuthError(error) {
  return messages[error?.code] || `Something went wrong (${error?.code || "unknown error"}). Please try again.`;
}