import React, { useState } from 'react';
export default function Login2() {
    const [data,setData] = useState({
        identifier:'',
        password:''
    }) 
    let handleChange = (e)=>{ 
        console.log(e.target.classList.contains('n_username'));
        if(e.target.classList.contains('n_username')){
            console.log(e.target.value);
            setData({
                ...data,
                identifier: e.target.value
            });
            console.log('username block')
        }
        if(e.target.classList.contains('n_password')){ 
            setData({
                ...data,
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
        </>
    );
}