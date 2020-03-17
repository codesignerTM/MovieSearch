import axios from "axios";

export const Authenticate = (email, password, name, isSignUp) => {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYB2LOT5UckwJR7jf328NizIXlExopAvw";
  let authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  if (isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYB2LOT5UckwJR7jf328NizIXlExopAvw";
    authData = {
      email: email,
      password: password,
      name: name,
      returnSecureToken: true
    };
  }

  return axios.post(url, authData);
};
