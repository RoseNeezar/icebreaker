import { useRemoteStore } from "@store/useRemoteStore";
import { useMount } from "wheel/Wheel";
import * as React from "react";

const Kanban = () => {
  const ref = React.useRef<any>(null);
  // console.log('exp')
  React.useEffect(() => {
    if (!ref.current) return;
    // console.log(ref.current, useMount)
    useMount(ref.current, "app", useRemoteStore);
  }, []);

  return <div ref={ref} />;
};

export default Kanban;
