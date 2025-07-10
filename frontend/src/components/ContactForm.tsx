// src/components/ContactForm.tsx

import React, { useState } from "react";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  message: z.string().min(5, "Nachricht muss mindestens 5 Zeichen haben"),
});

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const validate = () => {
    const result = ContactSchema.safeParse({ name, message });
    if (!result.success) {
      setErrorMsg(result.error.errors.map((e) => e.message).join(", "));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch(`${apiUrl}/kontakt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setMessage("");
      } else {
        throw new Error(data.message || `Fehler ${res.status}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dein Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          required
        />
      </label>

      <label>
        Deine Nachricht
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          required
        />
      </label>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sende…" : "Absenden"}
      </button>

      {status === "success" && (
        <p className="success">Danke für deine Nachricht!</p>
      )}
      {status === "error" && <p className="error">Fehler: {errorMsg}</p>}
    </form>
  );
}
