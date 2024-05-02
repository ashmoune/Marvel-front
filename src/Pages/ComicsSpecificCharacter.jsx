import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/ComicsScpecificCharacter.css";

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
          `https://site--backend-marvel--rh6mx4gc4kyd.code.run/comics/${characterId}`
        );
        setComics(response.data.comics);
        setCharacterName(response.data.name);
        setImageCharacter(
          `${response.data.thumbnail.path}/portrait_uncanny.${response.data.thumbnail.extension}`
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
    <main className="container-specific-comic">
      <section className="specific-charac">
        <Link to={`/character/${characterId}`} className="character-info">
          {characterName}
          {<img src={`${imageCharacter}`} alt="" />}
        </Link>
      </section>

      <h2>Appearances in the following comics : </h2>
      <section className="comics-section">
        {comics.map((comic) => {
          const image = `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`;

          return (
            <div className="caroussel" key={comic._id}>
              <div className="specific-comic">
                <Link to={`/comicId/${comic._id}`}>
                  <h3>{comic.title}</h3>
                  <p>
                    <img src={image} alt="" />
                  </p>
                  <p>{comic.description}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default ComicsSpecificCharacter;
