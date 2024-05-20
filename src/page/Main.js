import React from 'react'
import { useEffect, useState } from 'react';
import index from '../API/index.json';
import '../assets/Main.css';
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';
import creator from '../API/creator.json'
import moment from 'moment';

export default function Main() {

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
            <div class="list-video">
                {
                    index.map((e)=>{
                        return (
                            <Link to={`/view/${e.id}`} key={e.id} className='list-item'>
                                <div className="item-img">
                                    <img src={e.image} alt=""/>
                                </div>
                                <div className="description">
                                    <Link to={`/creator/${findCreator(e.creator).id}`} className="profile-image">
                                        <img src={findCreator(e.creator).profileImage} alt=""/>
                                    </Link>
                                    <div className="detail">
                                        <div className="item-tittle">{e.tittle}</div>
                                        <p>{findCreator(e.creator).name}</p>
                                        <p>การดู {getNumSting(e.detail.view)} ครั้ง | 
                                        <span> {moment(e.detail.date).fromNow()}</span></p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
