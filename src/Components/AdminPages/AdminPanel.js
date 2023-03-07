import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import useFullPageLoader from '../../hooks/useFullPageLoader'
import { auth, fs } from '../../Config/Config'
import { useNavigate } from 'react-router-dom';
export const AdminPanel = (props) => {
  const navigate = useNavigate();
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
          navigate('/error');;
        }
      })
    }, [])
    return uid;
  }

  const uid = GetUserUid();

  return (
    <>

      <div className="container-fluid">
        <h1>Admin PANEL</h1>

        <br></br>
        <div><Link className='navlink' to="add-products"><button type="button" class="btn btn-dark">ADD PRODUCTS</button></Link></div>
        <br></br>

        <div><Link className='navlink' to="add-winners"><button type="button" class="btn btn-dark">ADD WINNERS</button></Link></div>
        <br></br>

        <div><Link className='navlink' to="user-list"><button type="button" class="btn btn-dark">USER LIST</button></Link></div>
        <br></br>

        <div><Link className='navlink' to="bid-list"><button type="button" class="btn btn-dark">BID LIST</button></Link></div>
        <br></br>

        <div><Link className='navlink' to="usercode-list"><button type="button" class="btn btn-dark">USERCODE LIST</button></Link></div>
        <br></br>

        <div><Link className='navlink' to="add-categories"><button type="button" class="btn btn-dark">ADD CATEGORY</button></Link></div>
        <br></br>
        {loader}
      </div>
    </>
  );
};

