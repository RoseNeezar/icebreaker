import { app } from "./app";
import { socketServer } from "./socket/socket";

const start = async () => {
  const server = app.listen(5000, () => {
    console.log("Listening on port 3000 !");
  });

  socketServer(server);
};

start();
