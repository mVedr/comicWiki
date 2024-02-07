export const isLoggedIn = () => {
  // for development before jwt
  return localStorage.getItem("currId") !== null;
};
