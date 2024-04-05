import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterId = () => {
  const [character, setcharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${characterId}`
        );
        setcharacter(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);

  const description = character ? character.description : "";
  const thumbnailPath = character ? character.thumbnail.path : "";
  const thumbnailExtension = character ? character.thumbnail.extension : "";
  const image = `${thumbnailPath}/portrait_uncanny.${thumbnailExtension}`;

  return isLoading ? (
    <p>Loading..please wait</p>
  ) : (
    <main className="container">
      <h2>{character.name}</h2>
      <div className="imageCharacterId">
        <img src={image} alt="" />
      </div>
      <p>{description}</p>
    </main>
  );
};
export default CharacterId;
