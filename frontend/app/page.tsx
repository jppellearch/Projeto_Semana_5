type HealthResponse = {
  status: string;
  items: string[];
};

async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/health/", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getHealth();
  return (
    <main>
      <h1>Status: {data.status}</h1>
      <ul>
        {data.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </main>
  );
}