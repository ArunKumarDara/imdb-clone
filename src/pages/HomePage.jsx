import Trending from "./trending/Trending";
import Popular from "./popular/Popular";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-start gap-5 m-10">
      <Trending />
      <Popular />
    </div>
  );
};

export default HomePage;
