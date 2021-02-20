let image = [
    "c.jpg", "b.jpg","a.jpg"
    ];
let color = [
    "red", "blue","green"
    ];
var a = 0;

function _slider()
{
document.getElementById("slide").src = image[a];
document.getElementById("heading").style.color = color[a];

if(a<(image.length-1))
a++;
else
a=0;
}
setInterval(_slider, 2000);