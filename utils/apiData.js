import axios from "axios";

let BASE_URL;
if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
  BASE_URL = "https://ijinmu.herokuapp.com/api/v1";
} else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
  BASE_URL = "https://ijinmu.herokuapp.com/api/v1";
}

export { postLogin, getCompanyDetail };

const getToken = function () {
  let isToken = localStorage.getItem("attributes");
  return isToken;
};

const headerRequest = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

const postLogin = (email, password) => {
  const url = `${BASE_URL}/auth/login`;
  const bodyParams = {
    user: {
      email,
      password,
    },
  };

  return axios.post(url, bodyParams).then((response) => response.data);
};

const getCompanyDetail = (id) => {
  const url = `${BASE_URL}/companies/${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
