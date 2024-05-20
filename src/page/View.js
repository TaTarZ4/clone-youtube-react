import React from 'react';
import { useEffect, useState } from 'react';
import index from '../API/index.json';
import '../assets/View.css';
import { useParams , Link} from 'react-router-dom';
import Navbar from '../component/Navbar';
import creator from '../API/creator.json';
import moment from 'moment';

export default function Main() {

    // const [data , setData] = useState([])
    // const [video , setVideo] = useState({})
    // useEffect(()=>{
    //     const NewData = index.filter((e)=>{
    //         if(e.id !== video.id ){
    //             return e
    //         }
    //     })
    //     setData(NewData)
    // },[video])
    
    const {id} = useParams();

    const video = index.find((e)=>e.id==id);

    const data = index.filter((e)=>e.id !== video.id);

    const findCreator = (creator_id) =>{
        const create = creator.find((e)=>e.id == creator_id);
        return create;
    };

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

  return (
    <>
        <Navbar/>
        <div className='main'>
            <div className="main-center">
                <div className="video-main">
                    <iframe src={video.video} frameBorder="0"></iframe>
                </div>
                <div className="main-tittle">{video.tittle}</div>
                <div className="top-row">
                    <div className="creator">
                        <Link to={`/creator/${findCreator(video.creator).id}`} class="profile">
                            <img src={findCreator(video.creator).profileImage} alt=""/>
                        </Link>
                        <div class="profile-detail">
                            <Link to={`/creator/${findCreator(video.creator).id}`} class="name">{findCreator(video.creator).name}</Link>
                            <div class="follower">ผู้ติดตาม {getNumSting(findCreator(video.creator).followers)} คน</div>
                        </div>
                        <a href="" class="follow"><span>ติดตาม</span></a>
                    </div>
                    <div className="action">
                        <div className="action-like">
                            <a href="" className="like">
                                <i className="bi bi-hand-thumbs-up"></i>
                                <span>{getNumSting(video.detail.like)}</span>
                            </a>
                            <a href="" className="dislike">
                                <span>{getNumSting(video.detail.dislike)}</span>
                                <i className="bi bi-hand-thumbs-down"></i>
                            </a>
                        </div>
                        <div className="action-share">
                            <i className="bi bi-share"></i>
                            <span>แชร์</span>
                        </div>
                        <div class="action-other">
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div className="description-tittle">
                        <p>การดู {getNumSting(video.detail.view)} ครั้ง <span>{moment(video.detail.date).fromNow()}</span></p>
                    </div>
                    <div className="description-detail">{video.detail.description}</div>
                </div>
            </div>
            <div className="main-right">
                <div className="video-list">
                    {
                        data.map((e)=>{
                            return(
                                <Link to={`/view/${e.id}`} className="list-item" key={e.id}>
                                    <div className="item-img">
                                        <img src={e.image} alt=""/>
                                    </div>
                                    <div className="detail">
                                        <div className="item-tittle">{e.tittle}</div>
                                        <p>{findCreator(e.creator).name}</p>
                                        <p>การดู {getNumSting(e.detail.view)} ครั้ง |</p>
                                        <p>{moment(e.detail.date).fromNow()}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}