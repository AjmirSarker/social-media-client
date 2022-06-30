import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Feed from './Feed';
import Profile from './Profile';
import './Login.css'

const Home = () => {
  const {username}=useParams()
  const[pending,setPending]=useState(false)
    return (
        <div className='background'>
            <div className='row container-fluid mx-auto '>
        <div className="card-design my-3 border-success col-12 col-lg-3 " style={{minWidth:'277px'}}>
       
          <div className='sticky-lg-top'><Profile pending={pending} setPending={setPending} username={username}/></div>
        </div>
        <div className="container col-12 col-lg-6 mt-3">
          <Feed  pending={pending} setPending={setPending}  username={username}/>
         
        </div>
      
      </div>
        </div>
    );
};

export default Home;