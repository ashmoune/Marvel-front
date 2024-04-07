import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import wolvImage from "../assets/image/wolverine13.png";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--rh6mx4gc4kyd.code.run/characters?limit=100&skip=${skip}&name=${search}`
        );
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [search, skip]);

  return isLoading ? (
    <p>Loading.. please wait</p>
  ) : (
    <main className="container">
      <section className="hero-container-wolverine">
        <div className="search-bar">
          <p>Looking for a specific character ?</p>
          {/* Votre barre de recherche ici */}
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="your superhero"
          />
        </div>
        <p className="wolverine">
          <img src={wolvImage} alt="" />
        </p>
      </section>
      <section className="charactersSection">
        {data.map((character) => {
          const image = `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`;
          return (
            <Link
              key={character._id}
              to={`/comicsSpecificCharacter/${character._id}`}
              className="character-card"
            >
              <div>
                <h2>{character.name}</h2>
                {/* <p>{character.description}</p> */}
                <p>
                  <img src={image} alt="" />
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      <Pagination
        skip={skip}
        setSkip={setSkip}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Characters;
