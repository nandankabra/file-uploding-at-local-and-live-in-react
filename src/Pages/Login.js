import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FileUpload2 from './FileUpload2';




const config2 = require("../config2.json")
export default function Login2() { 
    const [data2,setData2] = useState({
        identifier:'nandan@gmail.com',
        password:'nandan@123'
    }) 
    const[  user , setUser] = useState({
        user:null,
        is_loggedin:false
    });

    useEffect(()=>{
        try {
            let user = JSON.parse( localStorage.getItem('user'))
            if(user){
                //login
                setUser({
                    ...user,
                    is_loggedin:true
                })
            }else{
                //not login
                setUser({
                    ...user,
                    is_loggedin:false
                })
            }

        } catch (error) {
            

        }
        alert("page loaded sucessfully ");
    },[]);



    let handleChange = (e)=>{ 
        console.log(e.target.classList.contains('n_username'));
        if(e.target.classList.contains('n_username')){
            console.log(e.target.value);
            setData2({
                ...data2,
                identifier: e.target.value
            });
            console.log('username block')
        }
        if(e.target.classList.contains('n_password')){ 
            setData2({
                ...data2,
                password: e.target.value
            });
            console.log('password block')
        }
    }
    let login = async (e)=>{
        e.preventDefault();
        console.log(data2);
        console.log("ok")

        try {
            let {data} = await axios.post(`${config2.dev_api_url}/api/auth/local`,{
                identifier: data2.identifier,
                password: data2.password,
            });
    
            console.log(data);
    
            setUser({
                ...user,
                is_loggedin:true
            });
    
            localStorage.setItem("user",JSON.stringify(data));
        } catch (error) {
            
        }

        
    }
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pt-5">
                    <h1 className="text-center">Login Form</h1>
                    <form onSubmit={ (e)=>{ login(e) } }>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control n_username" name="identifier" onChange={(e)=>{ handleChange(e) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password"  onChange={(e)=>{ handleChange(e) }} className="form-control n_password" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            { user.is_loggedin   &&
                <FileUpload2 />
            }
            
        </>
    );
}