import React from "react";

const Card = ({ elem }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow">
      <a href={elem.url} target="_blank" rel="noreferrer">
        <div className="h-40 w-full overflow-hidden rounded-lg mb-2">
          <img
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            src={elem.download_url}
            alt={elem.author}
            loading="lazy"
          />
        </div>
        <h2 className="font-semibold text-sm truncate">{elem.author}</h2>
      </a>
    </div>
  );
};

export default Card;
