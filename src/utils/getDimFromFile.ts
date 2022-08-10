export default function getDimFromFile(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    let u = URL.createObjectURL(file);
    let img = new Image();

    img.onload = function () {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = function () {
      reject("Loading failed");
    };

    img.src = u;
  });
}
