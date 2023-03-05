import React, { useState, useEffect } from 'react'
import { storage, fs, auth } from '../Config/Config'
import useFullPageLoader from '../hooks/useFullPageLoader'
import imageCompression from 'browser-image-compression';
export const AddCategories = (props) => {
    const now = Date.now();
    var date = new Date();
    const [categoryname, setCategoryName] = useState('');
    const [categorynumber, setCategoryNumber] = useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const [loader, showLoader, hideLoader] = useFullPageLoader();
    // getting current user uid
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            showLoader();
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                    const docRef = fs.collection('Admin').doc(user.uid)
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log('success')
                            hideLoader();
                        } else {
                            console.log('not user')
                            props.history.push('/');
                        }
                    })
                } else {
                    console.log('not user')
                    props.history.push('/');
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImageError('');
                var options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 512,
                    useWebWorker: true
                }
                imageCompression(selectedFile, options)
                    .then(function (compressedFile) {
                        setImage(compressedFile);
                        console.log('compress done');
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
            else {
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else {
            console.log('please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault();

        showLoader();
        const uploadTask = storage.ref(`productcategory-images/${image.name + now}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('productcategory-images').child(image.name + now).getDownloadURL().then(url => {
                fs.collection('Category').add({
                    categoryname,
                    categorynumber,
                    url,
                    Created: date
                }).then(() => {
                    setSuccessMsg('Category added successfully');
                    setCategoryName('');
                    setCategoryNumber('');
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 3000)
                }).catch(error => setUploadError(error.message)).then(() => {
                    hideLoader();
                });
            })
        })


    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Category</h1>
            <hr></hr>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Category Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setCategoryName(e.target.value)} value={categoryname}></input>
                <br></br>
                <label>Category Number</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setCategoryNumber(e.target.value)} value={categorynumber}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                    onChange={handleProductImg}></input>
                {imageError && <><br></br><div className='error-msg'>{imageError}</div></>}
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError && <>
                <br></br>
                <div className='error-msg'>{uploadError}</div>

            </>}
            {loader}
        </div>
    )
}