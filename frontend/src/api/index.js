import axios from "axios";

export const fetchMovies = async ({ page = 1, search = "" }) => {
  return axios.get(`${process.env.REACT_APP_API_HOST}/movies`, {
    params: {
      page,
      search,
    },
  });
};

export const fetchMovieByID = async (id) => {
  return axios.get(`${process.env.REACT_APP_API_HOST}/movies/${id}`);
};
