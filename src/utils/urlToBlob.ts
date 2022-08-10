export default function urlToBlob(url: string) {
  return new Promise<Blob>((resolve, reject) => {
    var canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (!ctx) return reject("No context");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return reject("No blob");
        resolve(blob);
      });
    };
    img.onerror = () => {
      return reject("Loading failed");
    };
    img.setAttribute("crossOrigin", "Anonymous");
    img.src = `https://www2.cs.ccu.edu.tw/~lyc109u/fetch/image.php?url=${url}`;
  });
}
