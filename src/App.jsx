import { useState } from "react";
import "./styles/app.scss";
import StoryWindow from "./component/story_window";

function App() {
  const [isStoriesOpen, setStoryWindowStat] = useState(false);
  return (
    <>
      {isStoriesOpen ? <StoryWindow /> : <></>}
      <section className="window">
        <button
          className="story_btn"
          onClick={() => {
            setStoryWindowStat(!isStoriesOpen);
          }}
        >
          open stories
        </button>
      </section>
    </>
  );
}

export default App;
