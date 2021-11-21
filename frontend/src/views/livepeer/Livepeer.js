import React, { useState } from "react";

import AppBody from "./AppBody";
import { getStreamStatus } from "../../utils/livepeerStream";

import "assets/scss/livepeer.scss";

export default function LivepeerStream(props) {
  const streamId = props.match.params.streamId;
  const playbackId = props.match.params.playbackId;
  const [streamIsActive, setStreamIsActive] = useState(false);

  React.useEffect(() => {
    let interval;
    if (streamId) {
      interval = setInterval(async () => {
        const streamStatusResponse = await getStreamStatus(streamId);
        if (streamStatusResponse.data) {
          const { isActive } = streamStatusResponse.data;
          setStreamIsActive(isActive);
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
      <AppBody playbackId={playbackId} streamIsActive={streamIsActive} />
      {false && (
        <div className="bg-black bg-opacity-60 flex items-center justify-center fixed top-0 left-0 h-screen w-screen">
          <div className="flex flex-col w-1/3 h-56 bg-white p-12 items-center text-center text-lg rounded">
            Some error occured
            <button className="border p-2 w-1/3 rounded border-livepeer hover:bg-livepeer hover:text-white mt-4">
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
