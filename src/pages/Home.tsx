import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useGetMoviesQuery } from "../services/API";
import { omdbApiKey } from "../config";
import Card from "../components/Card";
import TomPoster from "../assets/img/tomCruise.jpg";
import { AddWatchListIcon } from "../utils/SVG";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../hooks";
import { MoviesTypes } from "../type";
import { addList } from "../features/watchList/listSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  // Using RTK-query for fetching the data
  const { data, isLoading, isError } = useGetMoviesQuery(
    `apikey=${omdbApiKey}&s=${
      (search && searchQuery) || "Tom Cruise"
    }&type=movie&page=${page}`,
    { refetchOnFocus: false }
  );

  const handleSearch = () => {
    setSearchQuery(search);
  };
  const handlePageChange = (n: number) => {
    setPage(n);
  };
  const AddToWatchList = (item: MoviesTypes) => {
    if (item) {
      dispatch(addList({ item, id: user.email }));
    }
  };
  return (
    <div className="p-5 sm:ml-64">
      <div className="mb-5 px-3 py-2 border-[1.5px] border-[#cd9e9f] rounded-[5px]">
        <div className="mb-4">
          <h5 className="text-2xl  tracking-normal">
            Welcome to <span className="text-[#f33f40]">Watchlists</span>
          </h5>
        </div>
        <div>
          <p>
            Browse movies, add them to watchlists and share them with friends,
            Just click the
            <span>
              <AddWatchListIcon className="w-5 h-5 inline-block" />
            </span>
            to add a movie.
          </p>
        </div>
      </div>
      {/* Search Component */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
          className="w-5 h-5 absolute left-2 bottom-1.5 opacity-40"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
        </svg>
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Tom Cruise Movies"
          className="pl-8 p-2 pr-16"
          name="search"
        />
        <Button
          value="Search"
          onClick={handleSearch}
          className="absolute right-0 top-0 py-2"
        />
      </div>
      {/* Movies */}
      {isLoading ? <div>loading...</div> : null}
      {isError ? (
        <div>
          <p>Something went wrong</p>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2 mt-5">
        {data?.Search && data?.Search?.length > 0
          ? data?.Search?.map((item) => (
              <Card key={item.imdbID}>
                <div>
                  <div
                    className="absolute left-1 top-2 cursor-pointer"
                    onClick={() => AddToWatchList(item)}
                  >
                    <AddWatchListIcon
                      className="inline-block text-[#283130]"
                      size={30}
                    />{" "}
                  </div>
                  <a className="w-full">
                    <img
                      className="rounded-t-lg w-full sm:h-64 object-fill"
                      src={
                        item.Poster && item.Poster !== "N/A"
                          ? item.Poster
                          : TomPoster
                      }
                      alt=""
                    />
                  </a>
                  <div className="p-2">
                    <h5 className=" text-lg font-bold tracking-tight text-gray-900">
                      {item.Title}
                    </h5>
                    <p className=" font-normal text-gray-700">({item.Year})</p>
                  </div>
                </div>
              </Card>
            ))
          : null}
      </div>
      <div>
        {data && data.totalResults ? (
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={data ? Math.ceil(Number(data?.totalResults) / 10) : 0}
          />
        ) : null}
      </div>
    </div>
  );
}
