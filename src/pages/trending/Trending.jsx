import { getTrendingMovies } from "../../services/GetTrendingMovies";
import ToggleButton from "../../components/ToggleButton";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ListComponent from "../../components/ListComponent.jsx";

let categories = [
  { id: 1, label: "Today", value: "day", status: true },
  { id: 2, label: "This Week", value: "week", status: false },
];

const Trending = () => {
  const [result, setResult] = useState([]);
  const [options, setOptions] = useState(categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeRange = options.filter((option) => {
      if (option.status) {
        return option;
      }
    });
    getTrendingMovies(timeRange[0].value)
      .then(function (response) {
        const trending = response.data.results;
        setResult(trending);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, [options]);

  return (
    <div className="flex flex-col justify-start mt-10">
      <div className="flex items-center mb-4">
        <div className="text-black font-bold mr-6 text-xl">Trending</div>
        <ToggleButton options={options} setOptions={setOptions} />
      </div>
      <div>
        {loading ? (
          <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <Spin
              indicator={<LoadingOutlined spin style={{ fontSize: 30 }} />}
            />
          </div>
        ) : (
          <ListComponent result={result} />
        )}
      </div>
    </div>
  );
};

export default Trending;
