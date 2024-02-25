import { useState, useCallback } from "react";
import "./App.css";

const App = () => {
  const [ingredients, setIngredients] = useState("");

  const pasteIngredients = useCallback(async () => {
    if (ingredients.length >= 1000) return;

    try {
      const pasteText = await navigator.clipboard.readText();

      if (!pasteText) return;

      setIngredients((prevText) => {
        const newText = (prevText + pasteText).slice(0, 1000);
        return newText;
      });
    } catch (error) {}
  }, [ingredients, setIngredients]);

  const handleInputChange = useCallback(
    (e) => {
      const input = e.target.value;
      if (input.length <= 100) {
        setIngredients(input);
      }
    },
    [setIngredients]
  );

  return (
    <div>
      <h2> Enter</h2>

      <div>
        {ingredients.length > 0 && (
          <button
            type="button"
            onClick={() => setIngredients("")}
            aria-label="Clear input field"
          >
            Reset
          </button>
        )}
        <div>
          <textarea
            value={ingredients}
            onChange={handleInputChange}
            placeholder="Enter info"
            maxLength={1000}
            required
            style={{ width: "300px", height: "300px" }}
          />
        </div>

        <button
          type="button"
          aria-label="Paste ingredients"
          onClick={pasteIngredients}
        >
          Paste
        </button>
      </div>
    </div>
  );
};

export default App;
