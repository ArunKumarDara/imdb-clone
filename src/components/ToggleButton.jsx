const ToggleButton = ({ options, setOptions }) => {
  const handleClick = (index) => {
    const updatedCategories = options.map((option, i) => ({
      ...option,
      status: i === index ? true : false,
    }));
    setOptions(updatedCategories);
  };

  return (
    <div className="border border-gray-950 rounded-2xl flex justify-between items-center ">
      {options.map((option, index) => {
        return (
          <div
            key={option.id}
            className={`${
              option.status ? "bg-blue-950 text-white rounded-2xl" : ""
            }`}
          >
            <button
              className="text-center pl-2 pr-2"
              onClick={() => handleClick(index)}
            >
              {option.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToggleButton;
