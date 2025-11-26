import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=4&limit=30"
    );

    setUserData(response.data);
  };

  let printUserData = "No User Available";

  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a href={elem.url} target="_blank">
            <div className="h-40 w-44 overflow-hidden rounded-xl">
              <img
                className="h-full object-cover"
                src={elem.download_url}
                alt="Image"
              />
            </div>
            <h2 className="font-bold text-lg">{elem.author}</h2>
          </a>
        </div>
      );
    });
  }

  return (
    <div className="bg-black text-white h-screen p-4">
      <button
        onClick={getData}
        className="bg-green-600 mb-3 px-5 py-2 rounded text-white active:scale-95"
      >
        Get Data
      </button>

      <div className="flex flex-wrap gap-4">{printUserData}</div>
    </div>
  );
};

export default App;
