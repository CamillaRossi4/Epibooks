import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MyNav from "./components/MyNav";
import Welcome from "./components/Welcome";
import MyFooter from "./components/MyFooter";
import AllTheBooks from "./components/AllTheBooks";
import BookDetails from "./components/BookDetails";
import NotFound from "./components/NotFound";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <MyNav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Welcome />
              <AllTheBooks search={search} />
            </>
          }
        />
        <Route path="/book/:asin" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </>
  );
}

export default App;