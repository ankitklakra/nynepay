import { useState, useEffect } from 'react';
import {
    Box,
    useColorModeValue,
    Image,
    Heading,
} from '@chakra-ui/react';
import img from '../../Resources/undraw_Loading.png';
import { Products } from '../Mapping/Products';
import 'bootstrap/dist/css/bootstrap.css';
import { auth, fs } from '../../Config/Config';
import MainCarousel from '../BannerCarousel';
import MultiItemCategory from '../ProductCarousel/MultiItemCategory';
import { useNavigate } from 'react-router-dom';

export const SportsPage = (props) => {
    const navigate = useNavigate();
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);
    // getting current user uid

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();

    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await fs.collection('Sports').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    if (uid != null) {
        fs.collection('users').doc(uid).get().then(function (doc) {
            setFullName(doc.data().FullName);
            setEmail(doc.data().Email);
            setPhone(doc.data().Phone);
            setPhoto(doc.data().ProfileImage);
        })
    }
    useEffect(() => {
        getProducts();
    }, [])

    const __DEV__ = document.domain === 'localhost'

    const loadScript = (src) => {

        return new Promise((resolve) => {

            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    let Product;
    const addToCart = (product) => {
        if (uid !== null) {
            Product = product;
            console.log(Product);
            console.log(Product.ID);
            const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            const date = new Date();
            const month = date.getMonth(); // returns 0 - 11
            const year = date.getFullYear();
            console.log(months[month] + year);
            const now = Date.now();
            const res = loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                alert('Are you online?');
                return;
            }
            const options = {
                key: __DEV__ ? 'rzp_test_D6oAkDdW0BBxSc' : 'rzp_live_J2SC76kYBsHf9H',
                currency: "INR",
                amount: 900,
                name: 'NYNEPAY',
                image: 'https://e7.pngegg.com/pngimages/178/28/png-clipart-computer-icons-money-bag-bank-cash-angle-hand-thumbnail.png',
                handler: async function (response) {
                    alert(response.razorpay_payment_id);
                    const docRef = fs.collection(`Bid${months[month]}${year}`).doc(uid);
                    const doc = await docRef.get();
                    const usersRef = fs.collection(`Bid${months[month]}${year}`).doc(uid);
                    if (doc.exists) {
                        console.log('doc exists');
                        const docSnapshot = await usersRef.get();
                        const biddata = docSnapshot.data().Totalbid;
                        const prodRef = fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID);
                        const prodsnap = await prodRef.get();
                        if (prodsnap.exists) {
                            console.log('doc exists 1');
                            await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).update({
                                productbid: prodsnap.data().productbid + Number(1)
                            });
                        } else {
                            console.log('doc exists 2');
                            console.log(uid);
                            console.log(Product.ID);
                            console.log(Product);
                            Product['productbid'] = 1;
                            Product['time'] = date;
                            await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).set(Product);
                        }
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).update({
                            Totalbid: biddata + Number(1)
                        });
                        console.log('successfully bid');
                    } else {
                        console.log('first time');
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).set({
                            Id: uid,
                            FullName: fullname,
                            Email: email,
                            Phone: phone,
                            ProfileImage: photo,
                            Totalbid: Number(1),
                            Created: date
                        });
                        Product['productbid'] = 1;
                        Product['time'] = date;
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).set(Product);
                    }

                    const docRef2 = fs.collection('NynepayBiddingToken').doc(uid);
                    const doc2 = await docRef2.get();
                    if (doc2.exists) {
                        const docSnapshot2 = await docRef2.get();
                        const biddata = docSnapshot2.data().Totalbid;
                        await fs.collection('NynepayBiddingToken').doc(uid).update({
                            Totalbid: biddata + Number(1)
                        });

                    }
                    else {
                        await fs.collection('NynepayBiddingToken').doc(uid).set({
                            Id: uid,
                            FullName: fullname,
                            Email: email,
                            Phone: phone,
                            ProfileImage: photo,
                            Totalbid: Number(1),
                            Created: date
                        });
                    };

                },

                prefill: {
                    name: fullname,
                    email: email,
                    contact: phone
                },
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }
        else {
            navigate('/login');
        }
    }

    return (
        <Box
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        {products.length > 0 && (
            <Box margin={5}>
                <MultiItemCategory />
                <MainCarousel />
                <Heading>Sports</Heading>
                <div className='products-box'><Products products={products} addToCart={addToCart} /> </div>
            </Box>
        )}
        {products.length < 1 && (
            
            <Box boxSize='sm'>
                <Image src={img} alt='loading' />
            </Box>
          
        )}
    </Box>
    )
}

