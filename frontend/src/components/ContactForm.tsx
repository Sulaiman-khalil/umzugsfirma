import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${apiUrl}/kontakt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) throw new Error(`Server antwortete mit ${res.status}`);

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setMessage("");
      } else {
        throw new Error(data.message || "Unbekannter Fehler");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dein Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Deine Nachricht
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
