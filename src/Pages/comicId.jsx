import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ComicId = () => {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--rh6mx4gc4kyd.code.run/comic/${comicId}`
        );
        setComic(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comicId]);

  const description = comic ? comic.description : "";
  const thumbnailPath = comic ? comic.thumbnail.path : "";
  const thumbnailExtension = comic ? comic.thumbnail.extension : "";
  const image = `${thumbnailPath}/portrait_amazing.${thumbnailExtension}`;

  return isLoading ? (
    <p>Loading..please wait</p>
  ) : (
    <main className="comic-id container">
      <div className="imageComicId">
        <h2>{comic.title}</h2>
        <img src={image} alt="" />
      </div>
      <p className="desc-charac">{description}</p>
    </main>
  );
};
export default ComicId;
