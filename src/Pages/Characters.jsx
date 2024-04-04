import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading.. please wait</p>
  ) : (
    <main>
      {data.results.map((character) => {
        const image = `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`;
        return (
          <Link
            key={character._id}
            to={`/comicsSpecificCharacter/${character._id}`}
            image={image}
            characterName={character.name}
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
    </main>
  );
};

export default Characters;
