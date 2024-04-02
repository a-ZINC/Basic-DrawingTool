const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
const toolBtns=document.querySelectorAll('.tool');
const fillcolor=document.querySelector('#fill-color');
const sizeslider=document.querySelector('#size-slider');
const colorBtns=document.querySelectorAll('.colors .option')

let isdrwaing=false,
brushwidth=5,
selectedtool='brush',
prevmousex,prevmousey,
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
    ctx.fillStyle='black'
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
    if(selectedtool==='brush'){
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
}

toolBtns.forEach(btn=>{
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
    })

})
sizeslider.addEventListener('change', ()=>brushwidth=sizeslider.value)
canvas.addEventListener('mousedown', startdraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', (e)=>isdrwaing=false)
