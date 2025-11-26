import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/card";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=12`
      );

      setImages(res.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handlePrev = () => {
    if (page > 1 && !loading) {
      setImages([]);
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!loading) {
      setImages([]);
      setPage((prev) => prev + 1);
    }
  };

  const filteredImages = images.filter((item) =>
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black text-white h-screen flex flex-col p-4">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-xl font-semibold">Image Gallery</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by author..."
          className="bg-zinc-900 text-xs px-3 py-2 rounded-lg outline-none border border-zinc-700 focus:border-amber-400 w-44 sm:w-60"
        />
      </div>

      <div className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-zinc-800">
        {loading && images.length === 0 && (
          <h3 className="text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
            Loading...
          </h3>
        )}

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {!error && (
          <>
            {filteredImages.length === 0 && !loading ? (
              <p className="text-gray-400 text-sm text-center mt-10">
                No results found.
              </p>
            ) : (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredImages.map((item) => (
                  <Card key={item.id} elem={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-center gap-4 items-center pt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1 || loading}
          className="bg-amber-400 text-sm text-black rounded px-4 py-2 font-semibold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <h4 className="text-sm">Page {page}</h4>

        <button
          onClick={handleNext}
          disabled={loading}
          className="bg-amber-400 text-sm text-black rounded px-4 py-2 font-semibold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
