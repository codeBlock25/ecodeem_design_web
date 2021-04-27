import { useState } from "react";
import "./styles/app.scss";
import StoryWindow from "./component/story_window";
import LiveStreamWindow from "./component/live_stream";

function App() {
  const [isStoriesOpen, setStoryWindowStat] = useState(false);
  const [isLiveStreamOpen, setLiveStreamWindowStat] = useState(false);
  return (
    <>
      {isStoriesOpen ? <StoryWindow /> : <></>}
      {isLiveStreamOpen ? <LiveStreamWindow /> : <></>}
      <section className="window">
        <button
          className="window_btn"
          onClick={() => {
            setStoryWindowStat(!isStoriesOpen);
          }}
        >
          open stories
        </button>
        <button
          className="window_btn"
          onClick={() => {
            setLiveStreamWindowStat(!isLiveStreamOpen);
          }}
        >
          start live stream
        </button>
      </section>
    </>
  );
}

export default App;
