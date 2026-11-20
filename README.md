# Harbor Log - React Routing & Firebase Authentication

Course: Tools & Technologies for Internet Programming
Topic: React Router & Firebase Authentication

A small React app with five pages, a navbar, Firebase email/password
authentication, and routes that only logged-in users can open.
Built with React 18, Vite, React Router v6, Firebase v10 and plain CSS.

## Pages

| Page      | Route        | Access    | What it shows                                   |
|-----------|--------------|-----------|-------------------------------------------------|
| Home      | `/`          | Public    | Welcome message                                 |
| Login     | `/login`     | Public    | Email + password form, Login button            |
| Register  | `/register`  | Public    | Email + password form, Register button         |
| Dashboard | `/dashboard` | Protected | "Welcome to Dashboard", email, sign-in times   |
| Profile   | `/profile`   | Protected | Email, user ID, Logout button                  |

## Run it locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a Firebase project
   - Go to https://console.firebase.google.com and click **Add project**.
   - Open **Build -> Authentication -> Get started -> Sign-in method**
     and enable **Email/Password**.
   - Open **Project settings -> General -> Your apps -> Web (`</>`)**,
     register an app and copy the config values.
3. Copy `.env.example` to `.env` and paste the values
   ```bash
   cp .env.example .env
   ```
4. Start the dev server
   ```bash
   npm run dev
   ```
   Open the address shown in the terminal (usually http://localhost:5173).

> `.env` is listed in `.gitignore`, so your keys are not pushed to GitHub.
> Do not commit it.

## Project structure

```
src/
  firebase.js                 Firebase initialisation (initializeApp, getAuth)
  main.jsx                    Wraps the app in BrowserRouter and AuthProvider
  App.jsx                     Navbar + all <Routes>
  context/AuthContext.jsx     Auth state, register/login/logout, useAuth() hook
  components/Navbar.jsx       Links change with login status
  components/ProtectedRoute.jsx   Guards private pages
  pages/                      Home, Login, Register, Dashboard, Profile, NotFound
  utils/authErrors.js         Turns Firebase error codes into readable messages
  styles.css                  All styling (plain CSS)
```

## How it works (for the viva / explanation)

### 1. Routing
- `BrowserRouter` (in `main.jsx`) turns on client-side routing, so changing
  the URL swaps components without reloading the page.
- `Routes` and `Route` (in `App.jsx`) map each path to a page component.
- `Link` and `NavLink` (in `Navbar.jsx`) change the URL without a refresh.
  `NavLink` also adds an `active` class to the current page's link.
- `useNavigate` returns a function for redirecting from code, for example
  after logout. `Navigate` is a component that redirects when it renders.
- `path="*"` catches unknown URLs and shows the NotFound page.

### 2. Firebase Authentication
- `initializeApp` connects the app to my Firebase project, and `getAuth`
  gives the auth object used by every auth function.
- `createUserWithEmailAndPassword` registers a user (and signs them in).
- `signInWithEmailAndPassword` logs an existing user in.
- `signOut` logs the user out.
- Failed attempts throw an error with a `code` (like `auth/wrong-password`);
  `authErrors.js` maps those codes to messages for the user.

### 3. Authentication state and staying logged in
- `AuthContext.jsx` keeps the current `user` in React state and shares it
  with the whole app through `useContext`. Any component can call `useAuth()`.
- A `useEffect` subscribes to `onAuthStateChanged`. Firebase calls it on
  page load (with the saved user, or `null`) and every time someone logs
  in or out. The effect returns the unsubscribe function as cleanup.
- Firebase stores the session in the browser, so after a refresh
  `onAuthStateChanged` hands back the same user. That is why users stay
  logged in.
- While Firebase is still restoring the session (`restoring` is `true`) the
  app shows "Checking for a saved session…" instead of the pages. Without this,
  a logged-in user refreshing `/dashboard` would be kicked to `/login` for a
  moment, because `user` starts as `null`.
- The Navbar uses conditional rendering: `user ? (Dashboard, Profile, Log out)
  : (Log in, Register)`.

### 4. Protected routes
`ProtectedRoute` is a wrapper component:

```jsx
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

- If `user` exists, it renders its `children` (the real page).
- If `user` is `null`, it returns `<Navigate to="/login" replace state={{ from: location.pathname }} />`.
  `replace` keeps the protected URL out of the back-button history, and
  `state.from` remembers where the visitor wanted to go.
- After logging in, `Login.jsx` reads `location.state.from` and sends the
  user to that page (or `/dashboard` if there is none).
- `Login` and `Register` also redirect away if a user is already signed in.

## Extra touches in this version
- Redirect-back-after-login using router `state`
- Friendly error messages and a disabled button while a request is running
- Dashboard shows account creation and last sign-in time from Firebase metadata
- 404 page for unknown routes
- Firebase keys kept in `.env` instead of the source code

## Testing checklist (take screenshots of these)
1. Home page while logged out (navbar shows Log in / Register)
2. Register page, then the Dashboard after registering
3. Login page with a wrong password (error message)
4. Dashboard showing "Welcome to Dashboard" and the email
5. Profile page with the Logout button
6. Opening `/dashboard` while logged out, which redirects to `/login`
7. Refreshing the Dashboard while logged in, which keeps you logged in
8. Firebase Console -> Authentication -> Users, showing the registered account

## Submission
- GitHub repository link: _paste here_
- Screenshots: _attach the images from the checklist above_

```bash
git init
git add .
git commit -m "React routing and Firebase authentication assignment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
