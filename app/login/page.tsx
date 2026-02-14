"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      body: form,
      credentials: "same-origin"
    });

    if (!response.ok) {
      setError("Wrong password.");
      setLoading(false);
      return;
    }

    window.location.assign("/");
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1 className="login-title">myspace login</h1>
        <p className="login-subtitle">Sign in to view this private Valentine page.</p>
        <form onSubmit={onSubmit} className="login-form">
          <label htmlFor="password">Shared password</label>
          <input id="password" name="password" type="password" required className="login-input" />
          {error ? <p className="login-error">{error}</p> : null}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
