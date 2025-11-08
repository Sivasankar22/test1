export async function fetchData(endpoint, token = '') {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}
