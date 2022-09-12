const imageFileInput = document.querySelector('#imageFileInput');
const brightness = document.querySelector('#brightness');
const saturation = document.querySelector('#saturation');
const blur = document.querySelector('#blur');
const inversion = document.querySelector('#inversion');
const canvas = document.querySelector('#canvas');
const zim = canvas.getContext('2d');
const settings = {};
let image = null;
function resetSettings(){
     settings.brightness = '100';
     settings.saturation = '100';
     settings.blur = '0';
     settings.inversion = '0';
     brightness.value = settings.brightness;
     saturation.value = settings.saturation;
     blur.value = settings.blur;
     inversion.value = settings.inversion;
}
resetSettings();
function generateFilter(){
     const {brightness,saturation,blur,inversion} = settings;
     return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}
function renderImage(){
     canvas.width = image.width;
     canvas.height = image.height;
     zim.filter = generateFilter();
     zim.drawImage(image,0,0);
}
function updateSettings(key,value){
     if(!image) return;
     settings[key] = value;
     renderImage();
}
brightness.addEventListener('change',() => {
     updateSettings('brightness',brightness.value);
});
saturation.addEventListener('change',() => {
     updateSettings('saturation',saturation.value);
});
blur.addEventListener('change',() => {
     updateSettings('blur',blur.value);
});
inversion.addEventListener('change',() => {
     updateSettings('inversion',inversion.value);
});
imageFileInput.addEventListener('change',() => {
     image = new Image();
     image.addEventListener('load',() => {
          resetSettings();
          renderImage();
     });
     image.src = URL.createObjectURL(imageFileInput.files[0]);
});