import express from "express";
import axios from "axios";
import { createMcpServer } from "@modelcontextprotocol/sdk";

const app = express();

const FATHOM_API_KEY = process.env.FATHOM_API_KEY;

async function fathomRequest(endpoint) {
  const response = await axios.get(`https://api.fathom.video/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${FATHOM_API_KEY}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
}

const server = createMcpServer({
  tools: {
    async list_meetings() {
      return await fathomRequest("meetings");
    },
    async get_meeting({ meetingId }) {
      return await fathomRequest(`meetings/${meetingId}`);
    },
    async get_transcript({ meetingId }) {
      return await fathomRequest(`meetings/${meetingId}/transcript`);
    },
    async get_summary({ meetingId }) {
      return await fathomRequest(`meetings/${meetingId}/summary`);
    }
  }
});

app.use("/api/mcp", server);

export default app;
