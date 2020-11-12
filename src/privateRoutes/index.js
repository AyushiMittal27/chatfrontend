export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }

  if (localStorage.getItem("chatToken")) {
    return localStorage.getItem("chatToken");
  } else {
    return false;
  }
};
