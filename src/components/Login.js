import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import './Login.css'
const Login = () => {
    const[found,setFound]=useState([])
    const navigate =useNavigate()
    const [username,setUsername]=useState(null)
    const [user,setUser]=useState([])
    const [users,setUsers]=useState([])
    fetch('http://localhost:5000/users')
    .then((res)=>res.json())
    .then((data)=>setUsers(data))
    // let password;
    const { register,resetField, handleSubmit, watch, formState: { errors } } = useForm();
    //fetch
//  let url =`
//  http://localhost:5000/usered?username=${username}`
// useEffect(()=>{
 
//     fetch(` http://localhost:5000/useredd?username=${username}`)
// .then((res)=>res.json())
// .then((data)=>
//     setUser(data?.[0])

// )
// },[url,username])
// // const {data:user,isLoading,refetch}=useQuery('calluser',()=>{
// //     fetch(`http://localhost:5000/usered?username=${username}`)
// //  .then((res)=>res.json())

// // })
// // if(isLoading){
// //     return <p>Ok</p>
// // }
// // if(ok){
// //     fetch(` http://localhost:5000/usered?username=${username}`)
// // .then((res)=>res.json())
// // .then((data)=>
// //     setUser(data?.[0]))
    
// // }

    const onSubmit = data => {
        let check =1;
        let newusername=data.username
        newusername= newusername.split(' ').join('')
        // refetch()
// console.log(data.username);
//  setUsername(data.username)
//  console.log(username);
//  fetch(` http://localhost:5000/usered?username=${username}`)
// .then((res)=>res.json())
// .then((data)=>
//     setUser(data?.[0]))

 users.map((one)=>{
    if(one?.username===newusername && one?.password===data.password){
        toast.success('Successfully Log In Done!')
        navigate(`/home/${newusername}`)
        
    }else{
     check++
     console.log(check);
     
    }
   

})
const allLength= parseInt(users.length + 1)
if(check===allLength){
    console.log(check);
    toast.error('Username OR Password not matched!')
}

// if(user?.username===data.username && user?.password===data.password){
   
// toast.success('Everything Matched')
// navigate('/home')

// }else{
//     // setOk(true)
//     console.log(data.username);
//     console.log(data.password);
//     console.log(user?.username);
//     console.log(user?.password);
//     console.log(user);
//    toast.error(`Username or Password didn't matched`)
// }
 resetField("username")
   resetField("password")

    }
    const ForgetPass=(e)=>{
        e.preventDefault()
        
const forgetuser =e.target.email.value;
const password =e.target.password.value;
fetch(`http://localhost:5000/userd?email=${forgetuser}`)
.then((res)=>res.json())
.then((data)=>{
  setFound(data)
    
})
console.log(found);
const UpdateUser={password,forgetuser}

    // console.log('okkkkkkkkk');
    fetch(`http://localhost:5000/useres?email=${forgetuser}`,{
        method:'PUT',
        headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify(UpdateUser)
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.modifiedCount>=1){
            toast.success('Password Changed')
            
        }
        else{
            toast.error('Email not found')
            
            
        }
    })
   
    
e.target.reset()

// if(found<1){
//     toast.error('no')
// }

    }
    return (
        <div className='background'>
        <div  style={{ height: '100vh', width:'100vw' }}  className=' mx-auto  d-flex align-items-center'>
            <div className="mx-auto design-log">
                <h1 className='text-center '>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                <div className='my-3'>
                    <input className=' log-input' style={{ maxWidth: '350px' }} placeholder='username' {...register("username", {
                        required: {
                            value: true,
                            message: 'Username is Required'
                        }
                    })} />
                    {/* include validation with required or other standard HTML validation rules */}
                    {errors.username?.type === 'required' && <span className="text-danger">{errors.username.message}</span>}
                </div>
{/* <span>{isLoading}</span> */}
                    
                <div className='mb-3'>
                    <input 
                    className='log-input' 
                    style={{ maxWidth: '350px' }} {...register("password",{
                        required: {
                            value: true,
                            message: 'Password is Required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Must be 6 characters or longer'
                        }
                    })}
                    type="password" placeholder="Password" />

                    {/* errors will return when field validation fails  */}
                    {errors.password?.type === 'required' && <span className=" text-danger">{errors.password.message}</span>}
                </div>

                <div className='text-center my-2'>
                    <input type="submit" value='Login' className='login-btn'/>
                </div>
                </form>
                <p className=''>Don't have any account ? <Link className='text-decoration-none' to='/signup'>Create an account</Link> </p>
                <p className='btn ' 
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >Forget Password ?</p>
            </div>
        </div>
        
        <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content background border border-warning">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="staticBackdropLabel">Reset your password</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form  onSubmit={ForgetPass}>
                                <input
                                name='email'
                                 placeholder='enter email'  type="email" className='log-input m-2' required/>
                                <input
                                name='password'
                                placeholder='enter password'  type="password" className='log-input m-2' required/>
                                <div class="d-flex justify-content-center  py-2">
                                    <button type="submit" class="login-btn">Reset</button>
                                    <br />
                                    
                                </div>
                            </form>
                            {/* <h5 className='text-center text-warning fw-bolder bg-success py-1 rounded-3'>Double Click to Reset for more Security</h5> */}
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default Login;