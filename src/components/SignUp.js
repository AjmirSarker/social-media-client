import React, { useState , useEffect} from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css'

const SignUp = () => {
    let Email;
    const [name,setName]=useState([])
    const [email,setEmail]=useState({})
    const navigate =useNavigate()
    const { register,resetField, handleSubmit, watch, formState: { errors } } = useForm();

   fetch('http://localhost:5000/users')
   .then((res)=>res.json())
   .then((data)=>setName(data))

// useEffect(()=>{
//     fetch(`http://localhost:5000/user?email=${Email}`)
// .then((res)=>res.json())
// .then((data)=>setEmail(data))
// },[email,Email])

     
   
      
   const onSubmit =  (data,e) => {
   let username=data.username;
   username =username.split(' ').join('')
   
    const email=data.email;
    Email =email
    const password=data.password;
    const user ={username,email,password}
   const newname = name.filter((one)=>one.username===username || one.email===email)
   const exist = newname.length
   if(exist>0){
toast.error('Already Exist, Change Username OR Email')

   }
   else{
    const url ='http://localhost:5000/users'
   fetch(url,{
    method:'POST',
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify(user)

   })
   .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
        navigate('/')
       
        toast.success('User Created');
   }
//   console.log(Email);
//   console.log(email);
   resetField("username")
   resetField("email")
   resetField("password")

        
  };
    return (
        <div className='background'>
            <div style={{ height: '100vh', width:'100vw' }} className=' d-flex align-items-center'>
                <div className="mx-auto design-log">
                    <h1 className='mb-3 text-center'>Sign Up </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <div>
                            <input className='log-input ' style={{ maxWidth: '350px' }} placeholder='username' {...register("username", {
                                required: {
                                    value: true,
                                    message: 'Username is Required'
                                }
                            })} />
                            {/* include validation with required or other standard HTML validation rules */}
                            {errors.username?.type === 'required' && <span className="text-danger">{errors.username.message}</span>}
                        </div>

                        <div className='my-3'> 
                            <input
                           
                                type="email"
                                placeholder="Enter email"
                                className='log-input'
                                id='EmailValue'
                                name='email'
                                style={{ maxWidth: '350px' }}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })} />

                            {/* include validation with required or other standard HTML validation rules */}
                            {errors.email?.type === 'required' && <span className="text-danger text-start">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="text-danger text-start">{errors.email.message}</span>}
                        </div>

                        <div className='mb-3'>
                            <input className='log-input' style={{ maxWidth: '350px' }} {...register("password", {
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
                            {errors.password?.type === 'required' && <span className=" text-start text-danger">{errors.password.message}</span>}
                        </div>

                        <div className='text-center mt-1 mb-3'>
                            <input type="submit" value='Sign Up' className='login-btn' />
                        </div>
                    </form>
                    <p>Already have an account ? <Link className='text-decoration-none' to='/'>login here</Link> </p>
                </div>
            </div>
          
        </div>
    );
};

export default SignUp;