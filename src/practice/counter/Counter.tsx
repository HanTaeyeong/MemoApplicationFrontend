import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState<number>(0);

    const changeCount=(value:number)=>{
        setCount(count+value);
    }

    return (
        <div className="counter">
            <h1>I am a counter</h1>
            <button className="plus-button" onClick={()=>changeCount(1)}>+</button>
            <p className="count">{count}</p>
            <button className="minus-button" onClick={()=>changeCount(-1)} >-</button>
        </div>
    )
}

export default Counter;
