import { getPopular } from "../../services/GetPopular.js";
import ToggleButton from "../../components/ToggleButton";
import { useEffect, useState } from "react";
import ListComponent from "../../components/ListComponent.jsx";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

let categories = [
  { id: 1, label: "In Theatres", value: "movie", status: false },
  { id: 2, label: "On Tv", value: "tv", status: false },
  { id: 3, label: "People", value: "person", status: true },
];

const Popular = () => {
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
    getPopular(timeRange[0].value)
      .then(function (response) {
        const popular = response.data.results;
        setResult(popular);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, [options]);

  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-center mb-4">
        <div className="text-black font-bold mr-6 text-xl">
          What&apos;s Popular
        </div>
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

export default Popular;
