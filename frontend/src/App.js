import { useState, useEffect } from "react";
import axios from "axios";

var BE_URL = `${process.env.REACT_APP_BE_URL}`;

function App() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(""); // ⏰ date + time
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${BE_URL}/api/items`).then((res) => setItems(res.data));
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !dateTime) return;

    const res = await axios.post(`${BE_URL}/api/items`, {
      name,
      dateTime, // send full datetime string to backend
    });

    setItems([...items, res.data]);
    setName("");
    setDateTime(""); // clear inputs
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter text"
      />

      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        style={{ marginLeft: "1rem" }}
      />

      <button onClick={handleSave} style={{ marginLeft: "1rem" }}>
        Save
      </button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} – {new Date(item.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
