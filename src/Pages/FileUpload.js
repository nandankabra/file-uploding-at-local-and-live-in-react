import axios from 'axios';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config2 = require('../config2.json')

//RFC
export default function FileUpload() {
    //1. State/Hoook Variable
    const [file,setFile] = useState('')
    const [data,setData] = useState({
        readToSend: 'disabled',
        percent:0,
        loaded:false
    })


    //2. Function
    let handleChange = (e)=>{
        console.log('Changed',e[0])
        setFile(e[0])
        setData({
            readToSend: '',
            percent:0,
            loaded:false
        })
    }
    let uploadImage = async (e)=>{ //Fat Arrow Function / Arrow function ES6  e=event
        e.preventDefault();
        
        console.log('OKOKOK');

        //Lets create an object of FormData Class

        //let object = new ClassName();
        let data = new FormData();
        data.append('files',file);

        //Promise Chain

        try {
            //Success
           //await always wait for PO / Promise Object
           setData({
                readToSend: 'disabled',
                percent:0,
                loaded:true
           });
            let upload_response =   await axios({
                method: 'POST',
                url:`${ config2.dev_api_url }/api/upload`,
                data,
                onUploadProgress:(progress) =>{
                    console.log(progress);
                    setData({
                        readToSend: 'disabled',
                        loaded: true,
                        percent: Math.round(progress.loaded / progress.total * 100)
                    })
                }
            })
            setData({
                readToSend: '',
                loaded:false
            });
            toast("file Uploaded Successfully")
            console.log('file upload response ',upload_response) 
        } catch (error) {

            //Error
            console.log(error)
            
        }
    }

    //3. Return Statement Return JSX
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pb-5">
                    <h1>File Upload using ReactJS and Axios</h1>
                    
                    <form className="mt-5" onSubmit={(e)=>{ uploadImage(e) }}>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Upload File</label>
                            <input onChange={ (e)=>{ handleChange(e.target.files) } } type="file" accept="image/*" name="files" className="form-control" id="file"/>
                        </div>
                        <button type="submit" className={ `btn btn-primary ${data.readToSend}`}>Submit</button>
                    </form>

                    {
                        data.loaded &&
                        <div className="progress mt-3">
                            <div className="progress-bar" role="progressbar" style={{width: data.percent+'%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{ data.percent }%</div>
                        </div>
                    }
                   

                    <ToastContainer />
                </div>
            </div>
        </>
    );
}
