import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import bg from "./bgg.png";
const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState();
  const [url, setUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
  );
  const [search, setSearch] = useState("");
  const [con, setCon] = useState();
  const [not, setNot] = useState();
  const [store, setStore] = useState([]);
  const navigate = useNavigate();
  let searchFun = (e) => {
    e.preventDefault();
    if (search !== "") {
      setUrl(`https://pokeapi.co/api/v2/${search}/`);
      setCon("yes");
      setSearch("");
      navigate("/card");
    }
  };
  useEffect(() => {
    if (con === "yes") {
      fetchData(url);
      setCon("no");
    }
  }, [con]);
  var fetchData = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        let temp = res.data.results;
        temp.map((item) => {
          axios
            .get(item.url)
            .then((res) => {
              setPokeData((state) => {
                state = [...state, res.data];
                state.sort((a, b) => (a.id > b.id ? 1 : -1));
                return state;
              });
              setNot();
              setLoading(false);
            })
            .catch((err) => {
              console.log("Not Found");
            });
        });
        setNextUrl(res.data.next);
      })
      .catch((err) => {
        setNot("Not Found");
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchData(nextUrl);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
  let handleInput = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  let remove = (e) => {
    let i = store.findIndex((item) => item === e);
    store.splice(i, 1);
    setStore([...store])
  };
  var list = store.map((item,i) => {
    return (
      <div className="list">
        <div>{i+1} {item.toUpperCase()}</div>
        <button onClick={() => remove(item)} a>
          Remove
        </button>
      </div>
    );
  });
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <form onSubmit={searchFun} className="header">
              <img src={bg} alt="bg" />
             
              <input
                onChange={handleInput}
                value={search}
                type="text"
                placeholder="Type 'Pokemon' here"
                className="search"
              ></input>

              <button type="submit">Search</button>
              
            </form>
          }
        />
        <Route
          path="/card"
          element={
            <Card
              not={not}
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => {
                setPokeDex(poke);
                navigate("/pokeinfo");
              }}
              data={pokeDex}
            />
          }
        />
        <Route
          path="/pokeinfo"
          element={
            <div className="right-content">
              <Pokeinfo
                data={pokeDex}
                setFun={(arr)=>{setStore([...arr])}}
              />
            </div>

          }
        />
            <Route path="/saved" element={<div className="savedPage">{!store.length?<h1>No Items Saved</h1>:<div className="savedItems"><h1>Saved Pokemons</h1>{list}</div>}</div>}/>
      </Routes>
    </>
  );
};
export default Main;
