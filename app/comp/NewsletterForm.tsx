"use client";

import { useState, FormEvent } from "react";
import { ebGaramond } from "../utils/fonts";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="w-full max-w-lg p-8 mx-auto lh-card gap-6 flex flex-col">
      <h2
        className={`${ebGaramond.className} text-2xl text-center lh-bold text-darkest`}
      >
        Join newsletter
      </h2>
      <p className="text-center text-dark">
        Get updates, tips, and insights directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="lh-input grow"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="lh-btn-primary"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>

      {status === "success" && (
        <p className=" text-center text-green-400">{message}</p>
      )}
      {status === "error" && (
        <p className=" text-center text-red-400">{message}</p>
      )}
    </div>
  );
}
