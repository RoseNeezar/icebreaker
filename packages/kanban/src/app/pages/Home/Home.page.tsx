import useFormInput from "@shared-hooks/useFormInput";
import useSocket from "@store/websockets/websockets";
import React from "react";

const Home = () => {
  useSocket("who");
  const {
    onChangeText,
    resetText,
    fields: { title },
  } = useFormInput({
    title: "",
  });

  return (
    <div tw="bg-green-600 flex flex-col items-center  w-full overflow-hidden ">
      Wheel
    </div>
  );
};

export default Home;
