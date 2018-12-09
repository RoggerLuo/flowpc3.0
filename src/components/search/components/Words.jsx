import React from 'react'

function Words({ words }){
    return (
        <span >
            { words.map((word,ind) => (<span key={ind} style={{padding:'0 5px'}}> {word} </span>)) }
        </span>
    )
}

function Groups({ groups }) {
    return (
        <div style={{width:'100%', borderRight: '0.5px solid #ccc'}}>
            <div style={{padding:'10px 4px 10px 10px',fontSize:'18px'}}>
                { groups.map((words,ind) => <Words words={words} key={ind}/>) }
            </div>
            <div style={{widht:'100%',height:'1px',border:'0.5px solid #ccc'}}></div>
        </div>
    )
}

export default Groups

