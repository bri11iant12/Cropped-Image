document.addEventListener('DOMContentLoaded',() => {
    const fileInput = document.querySelector('#fileInput');
const img = document.querySelector('#image');
const cropBtn = document.querySelector('#cropBtn');
const downloadBtn = document.querySelector('#downloadBtn');
const resultCanvas = document.querySelector('#resultCanvas');

let cropper = null;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if(!file) return;
    if(file.size > 300 * 1024) {
        alert('Максимальный размер файла 300 Кб'); 
        return;
    }

    const url = URL.createObjectURL(file);
    img.src = url;

    if (cropper) cropper.destroy();

    img.onload = () => {
        cropper = new Cropper(img, {
            viewMode: 1,
            aspectRatio: NaN,
            zoomable: true,
            scalable: true,
            movable: true,
        });
    };
});

cropBtn.addEventListener('click', () => {
  if (!cropper) return;

  const canvas = cropper.getCroppedCanvas();
  resultCanvas.width = canvas.width;
  resultCanvas.height = canvas.height;
  const ctx = resultCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0);

  downloadBtn.disabled = false;
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = resultCanvas.toDataURL('image/png');
    link.click();
})
});