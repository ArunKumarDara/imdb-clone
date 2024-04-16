import logo from "../assets/imdb.png";
import { Link } from "react-router-dom";
import { Badge, Popover } from "antd";
import { useSelector } from "react-redux";

const movieFilters = [
  { id: 1, label: "Popular", value: "popular" },
  { id: 2, label: "Now Playing", value: "now_playing" },
  { id: 3, label: "Up Coming", value: "upcoming" },
  { id: 4, label: "Top Rated", value: "top_rated" },
];

const NavBar = () => {
  const watchListMovies = useSelector((state) => state.watchlist);
  const content = (
    <div>
      {movieFilters.map((filter) => {
        return (
          <Link to={`/movies/${filter.value}`} key={filter.id}>
            <div className="hover:bg-gray-300 w-[100%] p-1 rounded-md text-center cursor-pointer">
              {filter.label}
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="flex justify-start gap-7 items-center bg-blue-950 p-2 fixed w-full top-0 z-50 shadow-lg">
      <Link to="/">
        <div>
          <img src={logo} alt="IMDB" className="w-[60px] h-[50px]" />
        </div>
      </Link>
      <Popover content={content} placement="bottomRight">
        <div className="cursor-pointer text-white">Movies</div>
      </Popover>
      <Link to="/watchlist">
        <Badge count={watchListMovies.length || 0} offset={[12, -3]}>
          <div className="cursor-pointer text-white">Watchlist</div>
        </Badge>
      </Link>
    </nav>
  );
};

export default NavBar;
