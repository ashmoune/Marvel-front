import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import des pages
import ComicId from "./Pages/comicId";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";
import CharacterId from "./Pages/CharacterId";
import ComicsSpecificCharacter from "./Pages/ComicsSpecificCharacter";

// import components
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/comicId/:comicId" element={<ComicId />}></Route>
          <Route
            path="/character/:characterId"
            element={<CharacterId />}
          ></Route>
          <Route
            path="/comicsSpecificCharacter/:characterId"
            element={<ComicsSpecificCharacter />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
