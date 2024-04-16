import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, List, Avatar, Card, Space, Button, Input } from "antd";
import { LikeOutlined, StarOutlined, CloseOutlined } from "@ant-design/icons";
import { remove } from "../store/watchListSlice";

const { Title } = Typography;
const { Search } = Input;

const WatchList = () => {
  const dispatch = useDispatch();
  const watchListMovies = useSelector((state) => state.watchlist);
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className="m-9 mt-16">
      <Title level={3}>My Watchlist</Title>
      {
        <List
          itemLayout="vertical"
          size="small"
          dataSource={watchListMovies}
          renderItem={(item) => (
            <Card className="mb-3 shadow-xl" size="small">
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={item.popularity?.toFixed(2)}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={item.vote_count}
                    key="list-vertical-like-o"
                  />,
                ]}
                extra={
                  <div className="flex flex-col justify-center items-center">
                    <img
                      width={100}
                      alt="logo"
                      src={`https://image.tmdb.org/t/p/original/t/p/w500/${
                        item?.poster_path || item?.profile_path
                      }`}
                    />
                    ,
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      size="medium"
                      key="remove_watchlist_itemS"
                      danger
                      onClick={() => {
                        dispatch(remove(item));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                    >
                      {item.vote_average?.toFixed(2)}
                    </Avatar>
                  }
                  title={
                    <Title level={5}>{item.title || item.original_name}</Title>
                  }
                  description={item.release_date || item.first_air_date}
                />
                {item.overview}
              </List.Item>
            </Card>
          )}
        />
      }
    </div>
  );
};

export default WatchList;
