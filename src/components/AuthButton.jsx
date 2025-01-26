import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="auth-buttons">
      {!isAuthenticated ? (
        <>
          <button onClick={() => loginWithRedirect()}>Log In</button>
          <button
            onClick={() => loginWithRedirect({ screen_hint: "signup" })}
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}