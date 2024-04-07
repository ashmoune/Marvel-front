import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import avengers from "../assets/image/avengers.png";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--rh6mx4gc4kyd.code.run/comics?limit=100&skip=${skip}&title=${search}`
        );

        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, skip]);

  return isLoading ? (
    <p>Loading.. please wait</p>
  ) : (
    <>
      <main className="container">
        <section className="hero-container-avengers">
          <div className="search-bar">
            <p>looking for a specific comic ?</p>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Comic"
            />
          </div>
          <img src={avengers} alt="" />
        </section>

        <section className="comicsSection">
          {data.results.map((comics) => {
            const image = `${comics.thumbnail.path}/portrait_medium.${comics.thumbnail.extension}`;

            return (
              <Link
                key={comics._id}
                to={`/comicId/${comics._id}`}
                className="comic-card"
              >
                <div>
                  <h2>{comics.title}</h2>
                  {/* <p>{comics.description}</p> */}
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
    </>
  );
};

export default Comics;
