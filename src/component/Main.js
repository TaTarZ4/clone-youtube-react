import React from 'react'
import { useEffect, useState } from 'react';
import index from '../API/index.json'
import '../assets/Main.css'

export default function Main() {

    const [data , setData] = useState([])
    const [video , setVideo] = useState({
        "id" : 1,
        "tittle" : "Kami カミ ☯ Japanese Lofi HipHop Mix" ,
        "video" : "https://www.youtube.com/embed/goxmvGJkoi0?si=R_IkHafSs6Slkbmk",
        "image" : "https://i.ytimg.com/vi/goxmvGJkoi0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA5Hpz-kcww3maEdn4Bl0-VSgPGVQ"
    })
    useEffect(()=>{
        const NewData = index.filter((e)=>{
            if(e.id !== video.id ){
                return e
            }
        })
        setData(NewData)
    },[video])
    
  
  return (
    <div className='main'>
        <div class="main-center">
            <div class="video-main">
                <iframe src={video.video} frameborder="0"></iframe>
            </div>
            <div class="main-tittle">{video.tittle}</div>
        </div>
        <div class="main-right">
            <div class="video-list">
                {
                    data.map((e)=>{
                        return(
                            <div class="list-item" onClick={()=>(setVideo(e))}>
                                <div class="item-img">
                                    <img src={e.image} alt=""/>
                                </div>
                                <div class="item-tittle">{e.tittle}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
