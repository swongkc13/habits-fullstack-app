import { useEffect, useState } from 'react';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // Fetch all habits from the backend
  useEffect(() => {
    fetch('/api/habits')
      .then(res => res.json())
      .then(data => setHabits(data))
      .catch(err => console.error("Error loading habits", err));
  }, []);

  // Add a new habit
  const addHabit = () => {
    fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newHabit })
    })
    .then(res => res.json())
    .then(data => {
      setHabits([...habits, data]);
      setNewHabit('');
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>FocusForge – Micro Habit Tracker</h1>

      <input
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Add a new habit"
      />
      <button onClick={addHabit}>Add Habit</button>

      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            {habit.name} – done {habit.count} times
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
