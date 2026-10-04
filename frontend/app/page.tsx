'use client';

import { useEffect, useState } from 'react';

const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

export default function Home() {
  const [data, setData] = useState({ loading: true, status: '', items: [], error: false });

  useEffect(() => {
    let active = true;
    fetch(`${apiBase}/api/health/`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na API: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (active) {
          setData({ loading: false, status: res.status, items: res.items, error: false });
        }
      })
      .catch(() => {
        if (active) {
          setData({ loading: false, status: 'erro', items: [], error: true });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Status da aplicação: {data.loading ? 'carregando...' : data.status}</h1>
      <ul>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {data.error && (
        <p style={{ color: 'red' }}>Dados indisponíveis no momento. Tente novamente mais tarde.</p>
      )}
    </main>
  );
}