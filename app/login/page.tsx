"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-sm mx-auto px-4">
        <h1 className="text-2xl font-serif font-bold text-lab-text text-center mb-2">
          Lab Member Login
        </h1>
        <p className="text-sm text-lab-muted text-center mb-8">
          Sign in to update your profile and post news
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-lab-text mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20 focus:border-lab-blue"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-lab-text mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20 focus:border-lab-blue"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-medium text-white bg-lab-blue rounded-lg hover:bg-lab-blue-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-lab-muted text-center mt-6">
          Contact{" "}
          <a
            href="mailto:dviraran@technion.ac.il"
            className="text-lab-blue hover:underline"
          >
            dviraran@technion.ac.il
          </a>{" "}
          if you need an account
        </p>
      </div>
    </div>
  );
}
