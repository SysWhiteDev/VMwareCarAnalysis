import ffmpeg from "fluent-ffmpeg";

function getVideoDuration(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const duration = metadata.format.duration;
        resolve(duration);
      }
    });
  });
}

const videoSplitter = (videoPath) => {
  return new Promise((resolve, reject) => {
    getVideoDuration(videoPath)
      .then((duration) => {
        // console.log(`Video duration: ${duration} seconds`);

        const intervalInSeconds = 0.5;
        const timemarks = [];

        for (let i = 0; i < duration; i += intervalInSeconds) {
          timemarks.push(i);
        }
        // console.log(timemarks);

        ffmpeg()
          .input(videoPath)
          .on("filenames", (filenames) => {
            // console.log('created', filenames);
          })
          .on("end", () => {
            console.log("finito processing");
            resolve();
          })
          .on("error", (err) => {
            console.error("Error:", err);
            reject(err);
          })
          .takeScreenshots(
            {
              filename: "test%d.png",
              timemarks: timemarks,
              size: "1280x720",
            },
            "images"
          );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};

export default videoSplitter;
