const generateThumbnail = (video, canvas, ctx) => {
  video.addEventListener("loadeddata", () => {
    video.currentTime = 1; // 1 seconde
  });

  video.addEventListener("seeked", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  });
};
