document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = "Uploading...";
  
    const formData = new FormData();
    formData.append('title', document.getElementById('song-title').value);
    formData.append('song', document.getElementById('song-file').files[0]);
    formData.append('thumbnail', document.getElementById('thumbnail-file').files[0]);
  
    try {
      const response = await fetch('/.netlify/functions/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        messageDiv.textContent = "Upload successful!";
      } else {
        messageDiv.textContent = `Error: ${result.error}`;
      }
    } catch (error) {
      messageDiv.textContent = `Error: ${error.message}`;
    }
  });
  