import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://livepeer.com/api/",
  timeout: 10000,
});

const streamProfiles = [
  {
    name: "720p",
    bitrate: 2000000,
    fps: 30,
    width: 1280,
    height: 720,
  },
  {
    name: "480p",
    bitrate: 1000000,
    fps: 30,
    width: 854,
    height: 480,
  },
  {
    name: "360p",
    bitrate: 500000,
    fps: 30,
    width: 640,
    height: 360,
  },
];
const API_KEY = "e8436816-4777-4f7e-8d0f-01c2e493a825";
export const createLivepeerStream = async (streamName) => {
  const createStreamResponse = await apiInstance.post(
    "/stream",
    {
      name: streamName,
      profiles: streamProfiles,
    },
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (createStreamResponse && createStreamResponse.data) {
    return createStreamResponse.data;
  }
};

export const getStreamStatus = (apiKey, streamId) => {
  return apiInstance.get(`/stream/${streamId}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });
};
