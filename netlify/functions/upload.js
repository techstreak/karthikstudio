const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const form = new IncomingForm({ multiples: true, uploadDir: '/tmp' });
  const parseForm = () =>
    new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

  try {
    const { fields, files } = await parseForm();

    const uploadDir = path.join(__dirname, '..', '..', 'assets');
    const musicDir = path.join(uploadDir, 'music');
    const thumbnailsDir = path.join(uploadDir, 'thumbnails');

    if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true });
    if (!fs.existsSync(thumbnailsDir)) fs.mkdirSync(thumbnailsDir, { recursive: true });

    const songFile = files.song;
    const thumbnailFile = files.thumbnail;

    const songPath = path.join(musicDir, songFile.newFilename);
    const thumbnailPath = path.join(thumbnailsDir, thumbnailFile.newFilename);

    fs.renameSync(songFile.filepath, songPath);
    fs.renameSync(thumbnailFile.filepath, thumbnailPath);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Upload successful!',
        songUrl: `/assets/music/${songFile.newFilename}`,
        thumbnailUrl: `/assets/thumbnails/${thumbnailFile.newFilename}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
