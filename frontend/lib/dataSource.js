const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
const source = process.env.NEXT_PUBLIC_DATA_SOURCE || 'api';

let dbPromise = null;

async function fromApi() {
  const res = await fetch(`${apiBase}/api/health/`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status}`);
  }
  return res.json();
}

function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
      const app = getApps().length
        ? getApp()
        : initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          });
      const db = getFirestore(app);
      if (process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
      }
      return db;
    })();
  }
  return dbPromise;
}

async function fromFirestore() {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const db = await getDb();
  const snap = await getDocs(query(collection(db, 'items'), orderBy('ordem')));
  return { status: 'ok', items: snap.docs.map((d) => d.data().nome) };
}

export function fetchItems() {
  return source === 'firestore' ? fromFirestore() : fromApi();
}