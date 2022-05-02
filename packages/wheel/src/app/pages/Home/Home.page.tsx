import useSocket from "@store/websockets/websockets";
import React from "react";

const Home = () => {
  useSocket();

  return (
    <div tw="bg-green-600 flex flex-col items-center  w-full overflow-hidden">
      <div tw="bg-purple-800 p-3 rounded-lg mt-3">App name</div>
      oo
    </div>
  );
};

export default Home;
