import React from "react";

import "./style.css";

import Files from "../../components/Files";

const Home = () => {
  return (
    <div className="home">
      <h2>Pegasus</h2>
      <main className="content">
        <Files />
      </main>
    </div>
  );
};

export default Home;
