import { Typography, Badge, Button, List, Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/watchListSlice";
const { Title, Text } = Typography;
const { Ribbon } = Badge;

const ListComponent = ({ result }) => {
  const dispatch = useDispatch();

  const addToWatchList = (item) => {
    dispatch(add(item));
  };

  const removeFromWatchList = (item) => {
    dispatch(remove(item));
  };
  const watchList = useSelector((state) => state.watchlist);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={result}
      renderItem={(item) => (
        <List.Item>
          <Ribbon
            text={
              item?.vote_average?.toFixed(2) || item?.popularity?.toFixed(2)
            }
            key={item.id}
          >
            <Card className="shadow-xl relative">
              <div
                className="bg-center bg-cover h-[30vh] rounded-lg"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${
                    item?.poster_path || item?.profile_path
                  } )`,
                }}
              ></div>
              <div className="h-[10vh] flex flex-col justify-center items-center font-semibold p-2">
                <Title level={5}>
                  {item.title || item.name || item.original_name}
                </Title>
                <Text type="secondary">
                  {item.release_date || item.first_air_date}
                </Text>
              </div>
              <div className="absolute right-2 bottom-3 flex justify-center items-center">
                {watchList.some((each) => each.id === item.id) ? (
                  <Button
                    size="small"
                    type="link"
                    onClick={() => removeFromWatchList(item)}
                  >
                    <HeartFilled className="text-red-500" />
                  </Button>
                ) : (
                  <Button
                    size="small"
                    type="link"
                    onClick={() => addToWatchList(item)}
                  >
                    <HeartOutlined />
                  </Button>
                )}
              </div>
            </Card>
          </Ribbon>
        </List.Item>
      )}
    />
  );
};

export default ListComponent;
