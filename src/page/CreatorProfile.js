import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import creator from '../API/creator.json';
import index from '../API/index.json';
import Navbar from '../component/Navbar';
import '../assets/CreatorProfile.css'
import moment from 'moment';

export default function CreatorProfile() {
    const {id} = useParams();
    const getCreator = creator.find((e)=>e.id==id);
    // console.log(getCreator)
    const getNumSting = (num)=>{
        if(num < 1000){
            return num;
        }else if(num < 10000){
            const newNum = num/1000
            return `${newNum.toFixed(2)} พัน`;
        }else if(num < 100000){
            const newNum = num/10000
            return `${newNum.toFixed(2)} หมื่น`;
        }else if(num < 1000000){
            const newNum = num/100000
            return `${newNum.toFixed(2)} แสน`;
        }else if(num < 10000000){
            const newNum = num/1000000
            return `${newNum.toFixed(2)} ล้าน`;
        }else{
            const newNum = num/10000000
            return `${newNum.toFixed(0)} ล้าน`;
        }
    }

    const getVideo = index.filter((e)=>e.creator == id);
    console.log(getVideo);

    const [model , setModel] = useState(false);
  return (
    <>
        <Navbar/>
        <main>
            <div className="bg-img">
                <img src={getCreator.backgroundImage} alt=""/>
            </div>
            <div class="tittle">
                <div className="profile">
                    <img src={getCreator.profileImage} alt=""/>
                </div>
                <div className="detail">
                    <div className="name">{getCreator.name}</div>
                    <p>ผู้ติดตาม {getNumSting(getCreator.followers)} คน | วิดีโอ {getNumSting(getCreator.video)} รายการ</p>
                    <p className="description" onClick={()=>{setModel(!model)}}>{getCreator.about}</p>
                </div>
            </div>
            <div class="videos">
                {
                    getVideo.map((e)=>{
                        return (
                            <Link to={`/view/${e.id}`} class="video" key={e.id}>
                                <div class="img">
                                    <img src={e.image} alt=""/>
                                </div>
                                <div class="name">{e.tittle}</div>
                                <div class="detail">
                                    <p>การดู {getNumSting(e.detail.view)} ครั้ง | {moment(e.detail.date).fromNow()}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </main>
        <div className="model" style={model ? {display:'inline'}:{display:'none'}}>
            <div class="card">
                <div className="head">
                    <div className="tittle">เกี่ยวกับ</div>
                    <i className="bi bi-x-lg" onClick={()=>{setModel(!model)}}></i>
                </div>
                <p className="description" href=''>{getCreator.about}</p>
            </div>
            <div className="bg" onClick={()=>{setModel(!model)}}></div>
        </div>
    </>
  )
}
