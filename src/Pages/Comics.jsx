import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");

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
    <>
      <main>
        {data.results.map((comics) => {
          const image = `${comics.thumbnail.path}/portrait_medium.${comics.thumbnail.extension}`;

          return (
            <>
              <main>
                <Link to={`/comicId/${comics._id}`}>
                  <div className="comic-card">
                    <h2 key={comics._id}>{comics.title}</h2>
                    {/* <p>{comics.description}</p> */}
                    <p>
                      <img src={image} alt="" />
                    </p>
                  </div>
                </Link>
              </main>
            </>
          );
        })}
      </main>
    </>
  );
};

export default Comics;
