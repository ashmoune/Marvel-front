import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?limit=100&skip=${skip}`
        );
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [skip]);

  return isLoading ? (
    <p>Loading.. please wait</p>
  ) : (
    <main className="container">
      {data.map((character) => {
        const image = `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`;
        return (
          <Link
            key={character._id}
            to={`/comicsSpecificCharacter/${character._id}`}
            className="character-link"
          >
            <div className="character-card">
              <h2>{character.name}</h2>
              <p>{character.description}</p>
              <div>{image && <img src={image} alt="" />}</div>
            </div>
          </Link>
        );
      })}

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
