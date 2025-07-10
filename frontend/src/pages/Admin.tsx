// frontend/src/pages/Admin.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ContactEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: ${({ theme }) => theme.spacing.small};
  }
  th {
    background: ${({ theme }) => theme.colors.bgLight};
    text-align: left;
  }
`;

export default function Admin() {
  const [entries, setEntries] = useState<ContactEntry[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Token aus localStorage holen
    const token = localStorage.getItem("token");

    // GET /kontakt mit Bearer-Token im Header
    fetch(`${apiUrl}/kontakt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Fehler beim Laden der Daten");
        }
        return res.json();
      })
      .then((data: ContactEntry[]) => setEntries(data))
      .catch((err) => console.error("Admin-Fetch-Error:", err));
  }, [apiUrl]);

  return (
    <Container>
      <Title>Admin: Kontakt-Nachrichten</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nachricht</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.message}</td>
              <td>{new Date(e.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
