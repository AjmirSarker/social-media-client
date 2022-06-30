import React, { useState } from 'react';
import { BiImage } from 'react-icons/bi';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { GoLocation } from 'react-icons/go';
import toast from 'react-hot-toast';
const Post = ({ username,pending,setPending }) => {
  const[reload,setReload]=useState(false)
    const name = username
    // console.log(username);
  const newPost = (e) => {
e.preventDefault()

const post= e.target.post.value;
const image= e.target.image.value;
const username=name ;
const likes =parseInt(1);
const comments =[]
const fullPost={post,image,username,likes,comments}
const url ='http://localhost:5000/posts'
fetch(url,{
 method:'POST',
 headers:{
     'content-type': 'application/json'
 },
 body: JSON.stringify(fullPost)

})
.then((res) => res.json())
     .then((result) => {
      setReload(!reload);
      setPending(!pending)
       console.log(result);
     });
   
    
     toast.success('Post Added');
     e.target.reset()


  };
  return (
    <>
      <div className="container mt-2 border">
        <h5 className="text-center" style={{ }}>
         Share your words
        </h5>
        <form onSubmit={newPost} action="">
          <input
          required
          name='post'
            type="text"
            className="form-control mb-3 mt-4"
            placeholder="Write your post"
          />
          <input
          required
          name='image'
            type="text"
            className="form-control mb-5 mt-2"
            placeholder="Enter image Link"
          />
          <span className='text-success'><p>You can go imgbb and make a direct link<a target="_blank" className='ps-2 text-decoration-none' href="https://imgbb.com/" >Click</a></p></span>

          <div className="d-flex justify-content-between">
            <div className="px-1">
              <span style={{ fontSize: '18px', color: '#4E944F' }}>
                <BiImage />
              </span>
              <span style={{ fontSize: '18px', color: '#4E944F' }}> Image</span>
            </div>
            <div className="px-1">
              <span style={{ fontSize: '18px', color: '#21094E' }}>
                <HiOutlineVideoCamera />
              </span>
              <span style={{ fontSize: '18px', color: '#21094E' }}>
                {' '}
                Videos
              </span>
            </div>
            <div className="px-1">
              <span style={{ fontSize: '18px', color: '#B33030' }}>
                <GoLocation />
              </span>
              <span style={{ fontSize: '18px', color: '#B33030' }}>
                {' '}
                Videos
              </span>
            </div>
          </div>
          <div className="text-center my-3">
            <button
              type="submit"
              style={{
                color: 'white',
                background: '#446A46',
                border: '2px solid #446A46',
                padding: '3px 15px'
              }}
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
