import { AnimatePresence, motion } from "framer-motion";
import "../styles/components/story_window.scss";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";
import { Component } from "react";
import { cloneDeep } from "lodash";

export const FileType = {
  image: 0,
  video: 1,
};
class StoryWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyContent: [
        {
          id: 0,
          type: FileType.image,
          content: "http://localhost:3000/team-4-800x800.jpg",
        },
        {
          id: 1,
          type: FileType.image,
          content: "http://localhost:3000/st3.jpg",
        },
        {
          id: 2,
          type: FileType.video,
          content:
            "http://localhost:3000/pexels-polina-tankilevitch-6945762.mp4",
        },
      ],
      timerDuration: 7000,
      viewed: [],
      count: 0,
    };
    this.handleNext = () => {
      if (this.state.viewed.length >= this.state.storyContent.length) {
        return;
      }
      this.setState({
        count: this.state.count + 1,
        viewed: [
          ...this.state.viewed,
          this.state.storyContent[this.state.count + 1]?.id ?? "",
        ],
      });
    };
    this.handlePrev = () => {
      if (this.state.viewed.length <= 0) {
        return;
      }
      let _viewed = cloneDeep(this.state.viewed).pop();
      this.setState({
        count: this.state.count - 1,
        viewed: _viewed,
      });
    };
  }

  componentDidMount() {
    this.setState({ viewed: [this.state.storyContent[0].id] });
    setInterval(() => {
      if (this.state.viewed.length >= this.state.storyContent.length) {
        return;
      } else {
        this.setState({
          count: this.state.count + 1,
          viewed: [
            ...this.state.viewed,
            this.state.storyContent[this.state.count + 1]?.id ?? "",
          ],
        });
      }
    }, this.state.timerDuration);
  }
  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            transitionDuration: "0.2s",
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transitionDuration: "0.2s",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            animationTimingFunction: "ease-in-out",
            transitionDuration: "0.2s",
          }}
          className="story_window"
        >
          <div className="content">
            <div className="user_detail">
              <span className="profile_pic" />
              <span className="name">John Deo</span>
            </div>
            <div className="indicator">
              {this.state.storyContent.map((story) => {
                return (
                  <span
                    className={
                      this.state.viewed.includes(story.id) ? "active" : ""
                    }
                    key={story.id}
                    style={{
                      width: `calc(${this.state.storyContent.length} / 100%)`,
                      transitionDuration: `${this.state.timerDuration}ms`,
                    }}
                  />
                );
              })}
            </div>
            <button
              className="navigation_btn prev"
              onClick={() => this.handlePrev()}
            >
              <ChevronBackOutline
                color={"#00000"}
                title={"Previous"}
                height="25px"
                width="25px"
              />
            </button>
            <button
              className="navigation_btn next"
              onClick={() => this.handleNext()}
            >
              <ChevronForwardOutline
                color={"#00000"}
                title={"Next"}
                height="25px"
                width="25px"
              />
            </button>
            {this.state.storyContent.map((story) => {
              if (story.type === FileType.video) {
                return (
                  <video
                    className={
                      this.state.viewed.includes(story.id)
                        ? "view active"
                        : "view"
                    }
                    loop={true}
                    autoPlay={true}
                    src={story.content}
                    key={story.id}
                  ></video>
                );
              }
              return (
                <div
                  className={
                    this.state.viewed.includes(story.id)
                      ? "view active"
                      : "view"
                  }
                  style={{ backgroundImage: `url(${story.content})` }}
                  key={story.id}
                ></div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}
export default StoryWindow;
