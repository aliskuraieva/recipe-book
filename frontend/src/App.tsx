import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RecipeListPage from "./pages/RecipeListPage/RecipeListPage";
import RecipeInfoPage from "./pages/RecipeInfoPage/RecipeInfoPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeInfoPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
};

export default App;
