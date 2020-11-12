import React, { useEffect } from "react";

const IndexPage = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("chatToken");
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default IndexPage;
