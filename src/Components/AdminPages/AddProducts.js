import React, { useState, useEffect } from 'react'
import { storage, fs, auth } from '../../Config/Config'
import useFullPageLoader from '../../hooks/useFullPageLoader'
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
export const AddProducts = (props) => {
    const navigate = useNavigate();
    const now = Date.now();
    var date = new Date();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/webp','image/jfif'];

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
                            navigate('/error');
                        }
                    })
                } else {
                    console.log('not user')
                    navigate('/error');
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
        const uploadTask = storage.ref(`product-images/${image.name+now}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name+now).getDownloadURL().then(url => {
                fs.collection(category).add({
                    title,
                    description,
                    price,
                    url,
                    Created:date
                }).then(() => {
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    setCategory('');
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
            <h1>Add Products</h1>
            <hr></hr>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Product Category</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setCategory(e.target.value)} value={category}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                    onChange={handleProductImg}></input>

                {imageError && <>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>

                </>}
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