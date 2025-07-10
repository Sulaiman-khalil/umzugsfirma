import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.main`
  max-width: 400px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Input = styled.input`
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
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (!res.ok) throw new Error("Login fehlgeschlagen");
      const { token } = await res.json();
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit} as="form">
      <h1>Admin Login</h1>
      <Input
        type="text"
        placeholder="Benutzer"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Passwort"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Prüfe…" : "Login"}
      </Button>
      {error && <Error>{error}</Error>}
    </Container>
  );
}
