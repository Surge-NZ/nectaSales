export const fetch_start_agent = async (
  roomUrl: string | null,
  serverUrl: string
) => {
  const req = await fetch(`${serverUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ room_url: roomUrl }),
  });

  // Log the response for debugging
  console.log("Response status:", req.status);
  console.log("Response headers:", req.headers);

  try {
    const data = await req.json();
    console.log("Response data:", data);

    if (!req.ok) {
      return { error: true, detail: data.detail };
    }
    return data;
  } catch (err) {
    console.error("Failed to parse response:", err);
    return { error: true, detail: "Failed to parse response" };
  }
};
