const file = document.getElementById('file');
const image = document.getElementById('image');
const download = document.getElementById('download');
const rotateRight = document.getElementById('rotate-right');
const rotateLeft = document.getElementById('rotate-left');
const scaleXButton = document.getElementById('scale-X-button');
const scaleYButton = document.getElementById('scale-Y-button');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('preview-image');
const options = document.querySelector('.options-button');
const aspectRatioButtons = document.querySelectorAll('.aspect-ratio-buttons');
let cropper = "";
let fileName = "";
let scaleXClick = false;
let scaleYClick = false;
let rotateRightValue = -45;
let rotateLeftValue = 45;
window.onload = () => {
     download.classList.add('hide');
     options.classList.add('hide');
     preview.classList.add('hide');
};
file.onchange = () => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file.files[0]);
     fileReader.onload = () => {
          image.setAttribute('src',fileReader.result);
          if(cropper) cropper.destroy();
          cropper = new Cropper(image);
          options.classList.remove('hide');
          preview.classList.remove('hide');
     };
     fileName = file.files[0].name.split('.')[0];
};
aspectRatioButtons.forEach((element) => {
     element.addEventListener('click',() => {
          if(element.innerText == 'free'){
               cropper.setAspectRatio(NaN);
          }else{
               cropper.setAspectRatio(eval(element.innerText.replace(':',"/")));
          }
     });
});
rotateRight.addEventListener('click',() => {
     cropper.rotate(rotateRightValue);
});
rotateLeft.addEventListener('click',() => {
     cropper.rotate(rotateLeftValue);
});
scaleXButton.addEventListener('click',() => {
     if(scaleXClick){
          cropper.scaleX(1);
          scaleXClick = false;
     }else{
          cropper.scaleX(-1);
          scaleXClick = true;
     }
});
scaleYButton.addEventListener('click',() => {
     if(scaleYClick){
          cropper.scaleY(1);
          scaleYClick = false;
     }else{
          cropper.scaleY(-1);
          scaleYClick = true;
     }
});
preview.addEventListener('click',() => {
     download.classList.remove('hide');
     const imageSource = cropper.getCroppedCanvas({}).toDataURL();
     previewImage.src = imageSource;
});
download.addEventListener('click',() => {
     const imageSource = cropper.getCroppedCanvas({}).toDataURL();
     download.download = `Cropped_${fileName}.png`;
     download.setAttribute('href',imageSource);
});