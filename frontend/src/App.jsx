
import { useEffect, useState } from 'react';
import { getHabits, addHabit, incrementHabit } from './HabitService';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    getHabits().then(setHabits);
  }, []);

  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;
    await addHabit(newHabit);
    setNewHabit("");
    getHabits().then(setHabits);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <div className="flex mb-4">
        <input
          className="flex-grow border p-2 mr-2 rounded"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New Habit..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddHabit}>
          Add
        </button>
      </div>
      <ul>
        {habits.map(h => (
          <li key={h.id} className="mb-2 flex justify-between items-center">
            <span>{h.name} – {h.count}</span>
            <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => incrementHabit(h.id).then(() => getHabits().then(setHabits))}>
              +1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
