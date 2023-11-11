import ffmpeg from 'fluent-ffmpeg';

ffmpeg()
    .input('test.mp4') // Specify the input file here
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
        filename: 'test.png',
        timemarks: [1, 2],
    }, 'images');