import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ name: "", city: "" });
  const [dataList, setDataList] = useState([]);

 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api", formData);
      setFormData({ name: "", city: "" });
      fetchData(); 
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      setDataList(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Stored Data</h2>
      <ul>
        {dataList.map((item, index) => (
          <li key={index}>
            {item.name} from {item.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
