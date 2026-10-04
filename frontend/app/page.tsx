'use client';

import { useEffect, useState } from 'react';
import { fetchItems } from '../lib/dataSource';

export default function Home() {
  const [data, setData] = useState({ loading: true, status: '', items: [], error: false });

  useEffect(() => {
    let active = true;
    fetchItems()
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