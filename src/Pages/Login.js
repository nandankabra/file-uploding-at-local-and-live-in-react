  
import React, { useState } from 'react';

//RFC = React Funcitonal Compoent
export default function Login2() {
    //1. State/ Hoook Variable
    const [data,setData] = useState({
        identifier:'',
        password:''
    }) // {P:V,P:V} = JS Object

    //2. Functions defination
    let handleChange = (e)=>{ // e = event e is a formal argument
        console.log(e.target.classList.contains('a_username'));
        if(e.target.classList.contains('a_username')){
            //username
            console.log(e.target.value);
            setData({
                //get the previous data and place here
                ...data,
                //Now set the value of key/property
                identifier: e.target.value
            });
            console.log('username block')
        }
        if(e.target.classList.contains('a_password')){
            //password
            setData({
                //get the previous data and place here
                ...data,
                //Now set the value of key/property
                password: e.target.value
            });
            console.log('password block')
        }
    }
    let login = (e)=>{
        e.preventDefault();
        console.log(data);
        console.log("ok")
    }


    //3. Return statement JSX
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pt-5">
                    <h1 className="text-center">Login Form</h1>
                    <form onSubmit={ (e)=>{ login(e) } }>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control a_username" name="identifier" onChange={(e)=>{ handleChange(e) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password"  onChange={(e)=>{ handleChange(e) }} className="form-control a_password" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            

        </>
    );
}