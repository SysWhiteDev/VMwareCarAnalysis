import ffmpeg from 'fluent-ffmpeg';

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

const videoPath = 'test.mp4';

getVideoDuration(videoPath)
  .then(duration => {
    console.log(`Video duration: ${duration} seconds`);

    // Generate dynamic timemarks based on the video duration
    const numberOfScreenshots = duration; // Adjust as needed
    const timemarks = [];

    for (let i = 1; i <= numberOfScreenshots; i++) {
      const timemark = (i / (numberOfScreenshots + 1)) * duration;
      timemarks.push(timemark);
    }

    ffmpeg()
      .input(videoPath)
      .on('filenames', (filenames) => {
        console.log('created', filenames);
      })
      .on('end', () => {
        console.log('finito processing');
      })
      .on('error', (err) => {
        console.error('Error:', err);
      })
      .takeScreenshots({
        filename: 'test%d.png',
        timemarks: timemarks,
      }, 'images');
  })
  .catch(error => {
    console.error('Error:', error);
  });