import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <NoteCard key={index} item={item} />
      ))}
    </>
  );
};

export default NoteList;
