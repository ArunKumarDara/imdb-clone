import axios from "axios";

export const getPopular = (prop) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${prop}/popular`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTI1ZTg2YzNjMjI5MDFmYTZiOTY5MDYyNDNkZTI2MSIsInN1YiI6IjY2MDU5ZTQ1ZWNhZWY1MDE2MWFmYjhlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBdf4TIAGh9WhWRbU0ccr39H6KFzVRWQPabPHs3T_rg",
    },
  };
  return axios.request(options);
};
