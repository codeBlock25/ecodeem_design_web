import { AnimatePresence, motion } from "framer-motion";
import "../styles/components/story_window.scss";
import { Component } from "react";
import { RecordingOutline } from "react-ionicons";
import "../styles/components/live_stream.scss";

export const FileType = {
  image: 0,
  video: 1,
};
class LiveStreamWindow extends Component {
  componentDidMount() {
    var video = document.querySelector("#live_stream_player");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log(error);
          console.log("Something went wrong!");
        });
    }
  }
  componentWillUnmount() {
    var video = document.querySelector("#live_stream_player");
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
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
          className="liveStream_window"
        >
          <div className="content">
            <div className="user_detail">
              <span className="profile_pic" />
              <span className="name">
                John Deo:{" "}
                <u>
                  Live Stream{" "}
                  <RecordingOutline
                    color={"#00000"}
                    height="25px"
                    width="25px"
                  />
                </u>
              </span>
            </div>
            <div className="indicator">
              <span></span>
            </div>

            <video
              className={"view active"}
              autoPlay={true}
              id="live_stream_player"
            ></video>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}
export default LiveStreamWindow;
