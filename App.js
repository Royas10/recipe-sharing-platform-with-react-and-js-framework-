import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const addRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:5000/recipes", newRecipe);
      setRecipes([...recipes, response.data]);
      setNewRecipe({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Recipe Sharing Platform</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <button onClick={addRecipe} style={{ width: "100%" }}>Add Recipe</button>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "0.5rem" }}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
