import express from "express";
import dotenv from "dotenv";
import mcpRouter from "./routes/mcp.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/mcp", mcpRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MCP Server running on port ${PORT}`));


