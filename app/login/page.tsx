"use client";

import { useState } from "react";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      if (response.status === 401) {
        setError("Wrong password.");
      } else {
        setError("Login failed due to server configuration. Please try again.");
      }
      setLoading(false);
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    const safeNext = next && next.startsWith("/") ? next : "/";
    window.location.assign(safeNext as Route);
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-[20px]">Private Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Shared Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Signing in..." : "Enter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
