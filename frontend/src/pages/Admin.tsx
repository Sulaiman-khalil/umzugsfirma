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

const DeleteButton = styled.button`
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  border: none;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Admin() {
  const [entries, setEntries] = useState<ContactEntry[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchEntries = () => {
    fetch(`${apiUrl}/kontakt`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch fehlgeschlagen");
        return res.json();
      })
      .then(setEntries)
      .catch((err) => console.error(err));
  };

  useEffect(fetchEntries, [apiUrl, token]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/kontakt/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Löschen fehlgeschlagen");
      fetchEntries(); // Liste neu laden
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Admin: Kontakt-Nachrichten</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nachricht</th>
            <th>Datum</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.message}</td>
              <td>{new Date(e.createdAt).toLocaleString()}</td>
              <td>
                <DeleteButton onClick={() => handleDelete(e._id)}>
                  Löschen
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
