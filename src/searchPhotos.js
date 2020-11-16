import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { Loader } from './components/Loader';
import axios from 'axios';
import Modal from 'react-modal';

import InfiniteScroll from "react-infinite-scroll-component";
const unsplash = new Unsplash({
  accessKey: "nXqh9vdaVbi03jR5jJXuys1Ofv4XLJadv8ceaOAu46I",
});

export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  //console.log(query);
  useEffect(() => {
      fetchPics();
    }, [])
    const fetchPics = (count = 30) => {
        const apiRoot = "https://api.unsplash.com";

        axios
          .get(`${apiRoot}/photos/random?client_id=nXqh9vdaVbi03jR5jJXuys1Ofv4XLJadv8ceaOAu46I&count=30`)
          .then(res => {
            setPics([...pics, ...res.data]);
          })
      }



  const searchPhotos = async (e) => {
    e.preventDefault();

    unsplash.search
    .photos(query)
    .then(toJson)
    .then((json) => {
      setPics(json.results);
      //console.log(json);
    });
  };
const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
    <Loader />
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Type what you want to search`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
        </form>
        <div className="card-list">
          {
            pics.map((pic) =>
            <div className="card" key={pic.id}>
            <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
                dataLength={pics.length}
                next={fetchPics}
                hasMore={true}
              ></img>

            </div>)};
        </div>
    </>
  );
}
