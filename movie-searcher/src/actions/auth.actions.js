import axios from "axios";

export const Authenticate = (email, password, name, isSignUp) => {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYB2LOT5UckwJR7jf328NizIXlExopAvw";

  if (isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYB2LOT5UckwJR7jf328NizIXlExopAvw";
  }
  const authData = {
    email: email,
    password: password,
    name: name,
    returnSecureToken: true
  };
  return axios.post(url, authData);
};
