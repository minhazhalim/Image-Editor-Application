const fileInput = document.querySelector('.file-input');
const name = document.querySelector('.filter-info .name');
const value = document.querySelector('.filter-info .value');
const input = document.querySelector('.slider input');
const image = document.querySelector('.preview-image img');
const resetFilter = document.querySelector('.reset-filter');
const chooseImage = document.querySelector('.choose-image');
const saveImage = document.querySelector('.save-image');
const filterButton = document.querySelectorAll('.filter button');
const rotateButton = document.querySelectorAll('.rotate button');
let brightness = '100';
let saturation = '100';
let inversion = '0';
let grayscale = '0';
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;
const loadImage = () => {
     let file = fileInput.files[0];
     if(!file) return;
     image.src = URL.createObjectURL(file);
     image.addEventListener('load',() => {
          resetFilter.click();
          document.querySelector('.container').classList.remove('disable');
     });
}
const applyFilter = () => {
     image.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
     image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
filterButton.forEach(option => {
     option.addEventListener('click',() => {
          document.querySelector('.active').classList.remove('active');
          option.classList.add('active');
          name.innerText = option.innerText;
          if(option.id === 'brightness'){
               input.max = '200';
               input.value = brightness;
               value.innerText = `${brightness}%`;
          }else if(option.id === 'saturation'){
               input.max = '200';
               input.value = saturation;
               value.innerText = `${saturation}%`;
          }else if(option.id === 'inversion'){
               input.max = '100';
               input.value = inversion;
               value.innerText = `${inversion}%`;
          }else{
               input.max = '100';
               input.value = grayscale;
               value.innerText = `${grayscale}%`;
          }
     });
});
const updateFilter = () => {
     value.innerText = `${input.value}%`;
     const selectedFilter = document.querySelector('.filter .active');
     if(selectedFilter.id === 'brightness'){
          brightness = input.value;
     }else if(selectedFilter.id === 'saturation'){
          saturation = input.value;
     }else if(selectedFilter.id === 'inversion'){
          inversion = input.value;
     }else{
          grayscale = input.value;
     }
     applyFilter();
}
rotateButton.forEach(option => {
     option.addEventListener('click',() => {
          if(option.id === 'left'){
               rotate -= 90;
          }else if(option.id === 'right'){
               rotate += 90;
          }else if(option.id === 'horizontal'){
               flipHorizontal = flipHorizontal === 1 ? -1 : 1;
          }else {
               flipVertical = flipVertical === 1 ? -1 : 1;
          }
          applyFilter();
     });
});
const resetFilters = () => {
     brightness = '100';saturation = '100';inversion = '0';grayscale = '0';rotate = 0;flipHorizontal = 1;flipVertical = 1;
     filterButton[0].click();
     applyFilter();
}
const saveImages = () => {
     const canvas = document.createElement('canvas');
     const zim = canvas.getContext('2d');
     canvas.width = image.naturalWidth;
     canvas.height = image.naturalHeight;
     zim.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
     zim.translate(canvas.width / 2,canvas.height / 2);
     if(rotate !== 0){
          zim.rotate(rotate * Math.PI / 180);
     }
     zim.scale(flipHorizontal,flipVertical);
     zim.drawImage(image,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);
     const anchor = document.createElement('a');
     anchor.download = 'image.jpg';
     anchor.href = canvas.toDataURL();
     anchor.click();
}
input.addEventListener('input',updateFilter);
resetFilter.addEventListener('click',resetFilters);
saveImage.addEventListener('click',saveImages);
fileInput.addEventListener('change',loadImage);
chooseImage.addEventListener('click',() => fileInput.click());