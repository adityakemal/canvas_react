import React, {useLayoutEffect, useState} from 'react'

export default function Draw({type}) {
    const [draw, setDraw] = useState(false)

    const [dots, setDots] = useState([])
    const [lines, setLines] = useState([])

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext("2d")
        // ctx.drawImage('image', 0, 0, canvas.width, canvas.height);
        // style color
        // ctx.fillStyle='green'
        // // style stroke
        
        // var rect = canvas.getBoundingClientRect();
        // canvas.width = rect.width;
        // canvas.height = rect.height;

        function translatedX(x){
            var rect = canvas.getBoundingClientRect();
            var factor = canvas.width / rect.width;
            return factor * (x - rect.left);
        }
        
        function translatedY(y){
            var rect = canvas.getBoundingClientRect();
            var factor = canvas.width / rect.width;
            return factor * (y - rect.top);
        }
        //MAKE LINE
        lines.forEach(res=>{
            ctx.strokeStyle='skyblue'
            ctx.beginPath();
            ctx.lineTo(translatedX(res.x1), translatedY(res.y1));
            ctx.lineTo(translatedX(res.x2), translatedY(res.y2));
            ctx.closePath();
            ctx.stroke();
            // ctx.fill();
        })
        //MAKE DOT
        dots.forEach(res=>{
            ////
            ctx.beginPath();
            ctx.arc(translatedX(res.clientX), translatedY(res.clientY), 15, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.font = '10px Calibri';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('A'+res.id, translatedX(res.clientX), translatedY(res.clientY)+3);
            // ctx.fillText('0', x, y+3);
        })


    },[dots, lines])

    let handleMouseDown = (e)=>{
        if (type !== 'line') return; 

        setDraw(true)
        let {clientX, clientY} = e
        setLines([...lines, {id : lines.length +1, x1 : clientX, y1 : clientY}])
        console.log(clientX, clientY, 'begin')

    }

    // let handleMouseMove = (e)=>{
    //     // if (!draw) return;
    //     // let {clientX, clientY} = e
    //     // console.log(clientX, clientY)
    // }

    let handleClick = (e)=>{
        if (type !== 'dot') return; 
        let {clientX, clientY} = e
        console.log(e)
        // console.log(Math.floor(e.pageX-this.offsetLeft))
        
        setDots([...dots, { id: dots.length+1, clientX: clientX , clientY : clientY } ])
        console.log(dots)
    }

    let handleMouseUp = (e)=>{
        if (type !== 'line') return; 
        
        setDraw(false)
        let {clientX, clientY} = e
        let index = lines.length - 1
        const prevBeginLine = lines[index]
        setLines([...lines, {...prevBeginLine, x2 : clientX, y2 : clientY}])

        console.log(clientX, clientY, 'end')
    }
    return (
        <div id="frame">
            <canvas 
            id='canvas'
            style={{backgroundColor : 'whitesmoke', backgroundImage: `url('https://picsum.photos/50/50')`}}
            width={500}
            height={500}
            // width={window.innerWidth}
            // height={window.innerHeight}
            onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            >
                im draw
            </canvas>

        </div>

    )
}
