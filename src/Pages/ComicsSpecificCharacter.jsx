import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ComicsSpecificCharacter = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();
  const [characterName, setCharacterName] = useState("");
  const [imageCharacter, setImageCharacter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );
        setComics(response.data.comics);
        setCharacterName(response.data.name);
        setImageCharacter(
          `${response.data.thumbnail.path}/portrait_fantastic.${response.data.thumbnail.extension}`
        );

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading... please wait</p>
  ) : (
    <main>
      <Link to={`/character/${characterId}`} className="character-info">
        {characterName}
        {<img src={`${imageCharacter}`} alt="" />}
      </Link>
      <h2>Appearance in the following comics</h2>
      {comics.map((comic) => {
        const image = `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`;

        return (
          <div key={comic._id}>
            <Link to={`/comicId/${comic._id}`}>
              <h3>{comic.title}</h3>
              {/* <p>{comic.description}</p> */}
              <p>
                <img src={image} alt="" />
              </p>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default ComicsSpecificCharacter;
