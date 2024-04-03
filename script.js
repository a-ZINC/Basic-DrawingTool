const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
const toolBtns=document.querySelectorAll('.tool');
const fillcolor=document.querySelector('#fill-color');
const sizeslider=document.querySelector('#size-slider');
const colorBtns=document.querySelectorAll('.colors .option');
const colorPicker=document.querySelector('#color-picker');
const clearCanvas=document.querySelector('.clear-canvas');
const saveImg=document.querySelector('.save-img');
console.log(toolBtns)
let isdrwaing=false,
brushwidth=5,
selectedtool='brush',
prevmousex,prevmousey,
selectedcolor="#000",
snap

const setcanvasBackground=()=>{
    ctx.fillStyle='#fff',
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}
const drwaRect=(e)=>{
    if(!fillcolor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,prevmousex-e.offsetX,prevmousey-e.offsetY);
    }

    ctx.fillRect(e.offsetX,e.offsetY,prevmousex-e.offsetX,prevmousey-e.offsetY);
    
}
const drawCircle=(e)=>{
    console.log(e)
    ctx.beginPath();
    const radius=Math.sqrt(Math.pow(e.offsetX-prevmousex, 2) + Math.pow(e.offsetY-prevmousey, 2));
    ctx.arc(prevmousex,prevmousey,radius,0,2*Math.PI);
    fillcolor.checked?ctx.fill():ctx.stroke();
}
const drawTriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevmousex,prevmousey);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(2*prevmousex-e.offsetX,e.offsetY);
    ctx.closePath();
    fillcolor.checked?ctx.fill():ctx.stroke();
}
window.addEventListener('load', ()=>{
    canvas.height=canvas.offsetHeight;
    canvas.width=canvas.offsetWidth;
    setcanvasBackground();
})
const drawing=(e)=>{
    if(!isdrwaing) return;
    ctx.putImageData(snap,0,0)
    if(selectedtool==='brush' || selectedtool==='eraser'){
        ctx.strokeStyle=selectedtool==='eraser'?'#fff':selectedcolor;
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
    else if(selectedtool==='rectangle'){
        drwaRect(e);
    }
    else if(selectedtool==='circle'){
        drawCircle(e)
    }
    else{
        drawTriangle(e);
    }
    
    
}
const startdraw=(e)=>{
    console.log(e)
    isdrwaing=true;
    prevmousex=e.offsetX;
    prevmousey=e.offsetY;
    snap=ctx.getImageData(0,0,canvas.width,canvas.height)
    ctx.beginPath();
    ctx.lineWidth=brushwidth;
    ctx.lineCap='round';
    ctx.strokeStyle=selectedcolor;
    ctx.fillStyle=selectedcolor
}

toolBtns.forEach((btn)=>{
    console.log(btn)
    btn.addEventListener('click',()=>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active');
        selectedtool=btn.id
        console.log(btn.id)
    })
});
console.log(colorBtns)
colorBtns.forEach((btn)=>{
    console.log(btn);
    btn.addEventListener('click', ()=>{
        document.querySelector('.options .selected').classList.remove('selected')
        btn.classList.add('selected');
        selectedcolor=window.getComputedStyle(btn).getPropertyValue("background-color")
    })

})
colorPicker.addEventListener('change', ()=>{
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})
clearCanvas.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});
saveImg.addEventListener('click', ()=>{
    const link=document.createElement("a");
    link.href=canvas.toDataURL();
    link.download=`${Date.now()}.jpg`;
    link.click();
})

sizeslider.addEventListener('change', ()=>brushwidth=sizeslider.value)
canvas.addEventListener('mousedown', startdraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', (e)=>isdrwaing=false)
