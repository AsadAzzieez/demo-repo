import React from "react";
import Item from "./Item";

export const AllItems = ({items}) => {
  return (
    <>
    <h1>Items</h1>
      {items.map(item =>{
          return <li key={item.id}>{item.name} </li>
      })}
    </>
  );
};
