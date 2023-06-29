import React from "react";
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
const Card = ({ not, pokemon, loading, infoPokemon, data }) => {
let navigate=useNavigate()
  let card = pokemon.map((item, index) => {
    return (
      <>
        <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
          <h2>{index + 1}</h2>
          <img src={item.sprites.front_default} alt="" />
          <h2>{item.name}</h2>
        </div>
      </>
    );
  });
  let savePage=()=>{
    navigate('/saved')
  }
  return (
    <>{not?<div></div>: !loading?
      <div className="cardHead">
        <h1>Pokemon</h1><button className="savedButton" onClick={savePage}>Saved</button>
      </div>:<div></div>}
      <div className="container">
        <div className="left-content">
          {!not ? (
            <>
              {card}
              <div>{!loading ? <h1></h1> : <h1>Loading...</h1>}</div>
            </>
          ) : (
            <div>
              <h1>{not}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Card;
