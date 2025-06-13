export async function getHabits() {
  const response = await fetch('/api/habits');
  return response.json();
}

export async function addHabit(name) {
  const response = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return response.json();
}

export async function incrementHabit(id) {
  const response = await fetch(`/api/habits/${id}/increment`, {
    method: 'PATCH',
  });
  return response.json();
}
