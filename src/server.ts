import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import router from "./routes/router";

const server = express();

server.use("/", express.static("public"))
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.engine(".hbs", engine({ extname: ".hbs" }));
server.set("view engine", ".hbs");
server.set("views", "./pages");

server.use(router)

server.listen(8080, () => console.log(`Server running http://localhost:8080`));
   