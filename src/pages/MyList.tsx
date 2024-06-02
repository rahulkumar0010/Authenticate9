import EditIcon from "../assets/img/edit.png";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks";
import TomPoster from "../assets/img/tomCruise.jpg";
import { DoneIcon } from "../utils/SVG";
import { removeList } from "../features/watchList/listSlice";
import { useState } from "react";

export default function WatchList() {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(true);
  const { myList } = useAppSelector((state) => state.list);
  const { user } = useAppSelector((state) => state.auth);

  const removeItem = (imdbID: string) => {
    dispatch(removeList({ imdbID, id: user.email }));
  };

  return (
    <div className="p-4 sm:ml-64">
      <div>
        <div>
          <h5 className="text-black mb-2 text-2xl font-bold tracking-tight">
            Movies by Tom Cruise
            <button onClick={() => setIsEdit((prev) => !prev)}>
              <img
                src={EditIcon}
                alt=""
                className="inline-block ml-5 w-6 h-6 object-contain"
              />
            </button>
          </h5>
        </div>
        <div className="mt-5">
          <h5 className="text-black mb-2 text-lg font-semibold tracking-tight">
            About this watchList
          </h5>
          <p>This list shows your favorite movies.</p>
          <span className="font-extralight text-sm">
            Click on the edit icon to remove a movie from your watchlist.
          </span>
        </div>
        {/* Watchlists */}
        <div className="flex flex-wrap gap-5 mt-5">
          {myList && myList?.length > 0
            ? myList?.map((item, i) => (
                <Card key={item.imdbID + "" + i}>
                  <div>
                    <button
                      className={`absolute ${
                        isEdit ? "bg-slate-500" : "bg-slate-400"
                      } rounded p-2 bg-opacity-20 right-2 top-2`}
                      onClick={() => removeItem(item.imdbID)}
                      disabled={isEdit}
                    >
                      <DoneIcon
                        size={20}
                        className={!isEdit ? "text-green-500" : "text-white"}
                      />
                    </button>
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
                      <p className=" font-normal text-gray-700">
                        ({item.Year})
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
