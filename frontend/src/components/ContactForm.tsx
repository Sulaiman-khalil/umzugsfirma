import React, { useState } from "react";
import styled from "styled-components";
import { z } from "zod";

// 1) Zod-Schema für Validierung
const ContactSchema = z.object({
  name: z.string().min(2, "Name mindestens 2 Zeichen"),
  message: z.string().min(5, "Nachricht mindestens 5 Zeichen"),
});

// 2) Styled-Components
const Form = styled.form`
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const Message = styled.p<{ type: "success" | "error" }>`
  color: ${({ type, theme }) =>
    type === "success" ? theme.colors.success : theme.colors.error};
  text-align: center;
`;

// 3) Komponente
export default function ContactForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API_URL;

  // Validierung
  const validate = () => {
    const result = ContactSchema.safeParse({ name, message: msg });
    if (!result.success) {
      // Direkt die .issues-Property verwenden
      const messages = result.error.issues.map((issue) => issue.message);
      setError(messages.join(", "));
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
      const res = await fetch(`${API}/kontakt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: msg }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setMsg("");
      } else {
        throw new Error(data.message || `Fehler ${res.status}`);
      }
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
      />
      <Textarea
        rows={4}
        placeholder="Deine Nachricht"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        disabled={status === "loading"}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sende…" : "Absenden"}
      </Button>

      {status === "success" && (
        <Message type="success">Danke für deine Nachricht!</Message>
      )}
      {status === "error" && <Message type="error">Fehler: {error}</Message>}
    </Form>
  );
}
