import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc'
import {AiOutlineDelete}  from 'react-icons/ai'
import toast from 'react-hot-toast';
const Card = ({post,reload,setReload,reloading,setReloading,pending,setPending}) => {

    const id =post?._id
    
    const [like, setLike] = useState(false);
    const toggleLike = () => {
        setLike(!like);
    }
    const addLike=()=>{
        
        const image=post?.image;
       
        const comments =post?.comments;
        const username = post?.username
        // setIsloading(true)
let likes = parseInt(post.likes + 1)
const Newlike={likes,image,comments,username}
fetch(`http://localhost:5000/posts/${id}`,{
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(Newlike)
})
.then((res)=>res.json())
.then((data)=>{
   setReload(!reload)
   setReloading(!reloading)
})


    }
    let Comments=[...post?.comments]
    console.log(Comments);
    const viewComment=(e)=>{
        e.preventDefault()
        const image=post?.image;
       const comments =[...Comments,e.target.comment.value]
        
        const username = post?.username
        // setIsloading(true)

const Newlike={image,comments,username}
fetch(`http://localhost:5000/post/${id}`,{
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(Newlike)
})
.then((res)=>res.json())
.then((data)=>{
   setReload(!reload)
})
e.target.reset()
    }
    const Delete=()=>{
 fetch(`http://localhost:5000/posts/${id}`,{
    method:'DELETE'
 })
 .then((res)=>res.json())
 .then((data)=>{toast.success('Post Deleted')
 setReload(!reload)})
    }
    return (
        
        <div>
                 <div class="card p-2 text-center mb-3 ">                 
                    <img style={{ maxHeight: '400px',maxWidth:'500px' }} src={post?.image} class="card-img-top mx-auto mt-3 " alt="..." />
                    <div class="card-body">
                        <p class="card-text py-1">{post?.post}</p>
                        <div className='d-flex justify-content-between'>
                      <div onClick={()=>addLike()}>
                      <p class="card-text fs-4" onClick={toggleLike}>
                            {
                                like ? (<FcLike />) : (<AiOutlineHeart />)
                            }
                            <span>{post?.likes}</span>
                        </p>
                      </div>
                      
                        <button  type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                           <BiCommentDetail/> Comment
                        </button>
                        <button onClick={Delete} className='btn btn-danger'> Delete <span><AiOutlineDelete/></span></button>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                         {
                            Comments.map((one)=><p>{one}</p>)
                         }
                        </div>
                        <div class="modal-footer">
                       <form onSubmit={viewComment} action="">
                       <input name='comment' type="text" placeholder='add your comment' className="form-control" /><button type="submit" class="btn btn-primary">Save changes</button>
                       </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;