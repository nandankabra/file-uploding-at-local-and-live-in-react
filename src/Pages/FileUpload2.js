import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = require('../config.json');

//RFC
export default function FileUpload2() {
    //1. State/Hoook Variable
    const [file,setFile] = useState('')
    const [data,setData] = useState({
        percent : 0,
        loading: false
    })

    //2. Function
    let handleChange = (e)=>{
        console.log('Changed',e[0])
        setFile(e[0])
       
    }
    let uploadImage = async (e)=>{ //Fat Arrow Function / Arrow function ES6  e=event
        e.preventDefault();
        //Promise Chain
        //await always wait for PO / Promise Object
        try {
            setData({
                loading: true
            });
            
            console.log('OKOKOK');

            //Lets create an object of FormData Class

            //let object = new ClassName();
            let data = new FormData();
            data.append('files',file);

            let upload_response = await axios({
                method: 'POST',
                url:`${config.dev_api_url}/api/upload`,
                data,
                onUploadProgress:(progress)=>{ 
                    console.log("FileUpload ", progress);
                    setData({
                        loading: true,
                        percent: Math.round(progress.loaded / progress.total*100)
                    });
                }
            });
            if(upload_response.status === 200){
                toast("File Upload Success!");
                console.log('file upload response ',upload_response);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    //3. Return Statement Return JSX
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pb-5">
                    <h1>File Upload2 using ReactJS and Axios</h1>
                    <form className="mt-5" onSubmit={(e)=>{ uploadImage(e) }}>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Upload File</label>
                            <input onChange={ (e)=>{ handleChange(e.target.files) } } type="file" accept="image/*" name="files" className="form-control" id="file"/>
                        </div>
                        

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <br />
                    {
                        data.loading &&
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: data.percent+'%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{ data.percent }%</div>
                        </div>
                    }
                    
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
