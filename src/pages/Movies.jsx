import { useEffect, useState } from "react";
import { GetMovies } from "../services/GetMovies";
import { useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Spin,
  Row,
  Col,
  Typography,
  List,
  Pagination,
  Badge,
  Button,
  Card,
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/watchListSlice";

const { Title, Text } = Typography;
const { Ribbon } = Badge;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const pathSegments = location.pathname.split("/");
    const filter = pathSegments[pathSegments.length - 1];
    GetMovies(filter, page)
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [location.pathname, page]);

  const dispatch = useDispatch();

  const addToWatchList = (item) => {
    dispatch(add(item));
  };

  const removeFromWatchList = (item) => {
    dispatch(remove(item));
  };
  const watchList = useSelector((state) => state.watchlist);

  return (
    <Row className="m-6">
      <Col span={24}>
        <Title level={3} className="font-bold">
          Movies List
        </Title>
      </Col>
      <Col span={24}>
        <div className="flex justify-center items-center">
          <Title>filter</Title>
          <Title>something</Title>
        </div>
      </Col>
      <Col span={24}>
        <div>
          {loading ? (
            <div className="w-[100%] h-[100vh] flex justify-center items-center">
              <Spin
                indicator={<LoadingOutlined spin style={{ fontSize: 30 }} />}
              />
            </div>
          ) : (
            movies && (
              <div className="flex flex-col justify-start items-center gap-2">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={movies}
                  renderItem={(movie) => (
                    <List.Item>
                      <Ribbon text={movie.vote_average.toFixed(2)}>
                        <Card className="rounded-lg shadow-xl">
                          <div
                            className="bg-center bg-cover h-[30vh] rounded-lg"
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`,
                            }}
                          ></div>
                          <div className="h-[10vh] flex flex-col justify-center items-center font-semibold p-2">
                            <Title level={5}>{movie.title}</Title>
                            <Text type="secondary">{movie.release_date}</Text>
                          </div>
                          <div className="absolute right-2 bottom-3 flex justify-center items-center">
                            {watchList.some((item) => item.id === movie.id) ? (
                              <Button
                                size="small"
                                type="link"
                                onClick={() => removeFromWatchList(movie)}
                              >
                                <HeartFilled className="text-red-500" />
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                type="link"
                                onClick={() => addToWatchList(movie)}
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
                <Pagination
                  defaultCurrent={1}
                  current={page}
                  total={100}
                  showSizeChanger={false}
                  onChange={(page) => setPage(page)}
                />
              </div>
            )
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Movies;
