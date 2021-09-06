import React, {useState} from 'react';
import Draw from './Draw';

function Menu(props) {
    const [type, setType] = useState('')

    return (
        <div>
        <div style={{backgroundColor:'skyblue', position : 'absolute'}}>
            <div className="header">
            <h3>menu</h3>
                <button onClick={()=>setType('dot')}>dot</button>
                <button onClick={()=>setType('line')}>line</button>
                <h3>type: {type}</h3>
            </div>
        </div>
        <div  style={{height: '100vh', display : 'flex', justifyContent : 'center', alignItems : 'center', width : '100%'}}>

            {/* <div className="div" style={{height : 500, width: 700, border: '1px solid black'}}> */}
                 <Draw type={type} />
            {/* </div> */}
        </div>

        </div>
    );
}

export default Menu;