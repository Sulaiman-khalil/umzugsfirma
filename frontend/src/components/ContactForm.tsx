// frontend/src/components/ContactForm.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  message: z.string().min(5, "Nachricht muss mindestens 5 Zeichen haben"),
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  max-width: 500px;
  margin: auto;
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
  resize: vertical;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ $type: "success" | "error" }>`
  color: ${({ $type, theme }) =>
    $type === "success" ? theme.colors.success : theme.colors.error};
`;

export default function ContactForm() {
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
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
      />
      <Textarea
        placeholder="Deine Nachricht"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={status === "loading"}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sende…" : "Absenden"}
      </Button>

      {status === "success" && (
        <Message $type="success">Danke für deine Nachricht!</Message>
      )}
      {status === "error" && (
        <Message $type="error">Fehler: {errorMsg}</Message>
      )}
    </Form>
  );
}
