import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemsRoute from "./routes/problem.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/problems", problemsRoute);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
