import { useState, useEffect } from "react";
import axios from "axios";

var BE_URL = `${process.env.REACT_APP_BE_URL}`;

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`${BE_URL}/api/items`).then((res) => setItems(res.data));
  }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    const res = await axios.post(`${BE_URL}/api/items`, { name });
    setItems([...items, res.data]);
    setName("");
  };

  return ( 
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}> 
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSave}>Save</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
