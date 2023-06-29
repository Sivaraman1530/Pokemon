import React from "react";

import {
  useNavigate
} from "react-router-dom";
import Arr from './store'
const Pokeinfo = ({ data ,setFun}) => {
    let navigate=useNavigate()
    let save=()=>{
        if(Arr.indexOf(data.name)<0){
       Arr.push(data.name)}
       setFun([...Arr])
    }
      let savePage=()=>{
        navigate('/saved')
      }
  return (
    <>
    <button className='savedButton' onClick={savePage}>Saved</button>
      {!data ? (
        ""
      ) : (
        <>
          <button className='saveButton' onClick={save}>Save</button>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          <div className="base-stat">
            {data.stats.map((poke) => {
              return (
                <>
                  <div className="infos">
                    <div className="key">{poke.stat.name}</div><div className="value">:{poke.base_stat}</div>
                  </div>
                </>
              );
            })}
          </div>
          
        </>
      )}
    </>
  );
};
export default Pokeinfo;
