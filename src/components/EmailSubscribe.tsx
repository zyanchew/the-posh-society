"use client";

import { useState } from "react";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string })?.error || "Failed");
      setMsg("Subscribed! We’ll email you about deals & drops.");
      setEmail("");
    } catch (error: unknown) {
      setMsg(error instanceof Error ? error.message || "Something went wrong." : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Subscribe"}
        </button>
      </div>
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </form>
  );
}
