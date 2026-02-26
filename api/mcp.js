import axios from "axios";

export default async function handler(req, res) {
  const FATHOM_API_KEY = process.env.FATHOM_API_KEY;

  if (!FATHOM_API_KEY) {
    return res.status(500).json({ error: "Missing FATHOM_API_KEY" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tool, arguments: args } = req.body;

  try {
    if (tool === "list_meetings") {
      const response = await axios.get(
        "https://api.fathom.video/v1/meetings",
        {
          headers: {
            Authorization: `Bearer ${FATHOM_API_KEY}`
          }
        }
      );
      return res.status(200).json(response.data);
    }

    if (tool === "get_meeting") {
      const response = await axios.get(
        `https://api.fathom.video/v1/meetings/${args.meetingId}`,
        {
          headers: {
            Authorization: `Bearer ${FATHOM_API_KEY}`
          }
        }
      );
      return res.status(200).json(response.data);
    }

    return res.status(400).json({ error: "Unknown tool" });

  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
