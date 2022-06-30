import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Feed from './Feed';
import Profile from './Profile';


const Home = () => {
  const {username}=useParams()
  const[pending,setPending]=useState(false)
    return (
        <div className=''>
            <div className='row container-fluid mx-auto '>
        <div className="col-12 col-lg-3 " style={{minWidth:'277px'}}>
       
          <Profile pending={pending} setPending={setPending} username={username}/>
        </div>
        <div className="container col-12 col-lg-9 mt-3">
          <Feed  pending={pending} setPending={setPending}  username={username}/>
         
        </div>
      
      </div>
        </div>
    );
};

export default Home;