let image = require('../assets/images/img1.jpg')
let img = document.createElement('img');
img.src = image;
document.body.appendChild(img)
export default function(){
    console.log('header...');
    let a = 'abcdef--header'
    console.log(a);
    console.log('123456');
}