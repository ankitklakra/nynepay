import { useState, useEffect } from 'react';
import {
    Box,
    useColorModeValue,
    Image,
    Heading,
} from '@chakra-ui/react';
import img from '../../Resources/undraw_Loading.png';
import { Products } from '../Products';
import 'bootstrap/dist/css/bootstrap.css';
import { auth, fs } from '../../Config/Config';
import MainCarousel from '../MainCarousel';
import MultiItemCategory from '../MultiItemCategory';


export const MobilesPage = (props) => {
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

    const PreviousBtn = (props) => {
        console.log(props);
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                {/* <ArrowBackIos style={{ color: "blue", fontSize: "30px" }} /> */}
            </div>
        );
    };
    const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                {/* <ArrowForwardIos style={{ color: "blue", fontSize: "30px" }} /> */}
            </div>
        );
    };


    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await fs.collection('Mobiles').get();
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
    // state of products
    const [category, setCategory] = useState([]);

    // getting products function
    const getCategory = async () => {
        const category = await fs.collection('Category').get();
        const categoryArray = [];
        for (var snap of category.docs) {
            var data = snap.data();
            data.ID = snap.id;
            categoryArray.push({
                ...data
            })
            if (categoryArray.length === category.docs.length) {
                setCategory(categoryArray);
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
        getCategory();
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
    async function addToCart(product) {
        if (uid !== null) {
            Product = product;
            var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

            var date = new Date();

            var month = date.getMonth(); // returns 0 - 11

            var year = date.getFullYear();

            console.log(months[month] + year);
            
            const now = Date.now();


            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Are you online?')
                return
            }

            // const data = await  fetch('http://localhost:3000/razorpay', { method: 'POST' }).then((t) =>
            // 	t.json()
            // )

            // console.log(data)

            const options = {
                key: __DEV__ ? 'rzp_test_D6oAkDdW0BBxSc' : 'rzp_live_J2SC76kYBsHf9H',
                currency: "INR",
                amount: 900,
                name: 'NYNEPAY',
                image: 'https://e7.pngegg.com/pngimages/178/28/png-clipart-computer-icons-money-bag-bank-cash-angle-hand-thumbnail.png',
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    // alert(response.razorpay_order_id)
                    // alert(response.razorpay_signature)

                    const docRef = fs.collection('Bid' + months[month] + year).doc(uid);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            const usersRef = fs.collection('Bid' + months[month] + year).doc(uid)
                            usersRef.get()
                                .then((docSnapshot) => {
                                    var biddata = docSnapshot.data().Totalbid;
                                    // console.log(biddata)
                                    const prodRef = fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID)
                                    prodRef.get()
                                        .then((prodsnap) => {
                                            if (prodsnap.exists) {
                                                fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).update({
                                                    productbid: prodsnap.data().productbid + Number(1)
                                                }).then(() => {
                                                    fs.collection('Bid' + months[month] + year).doc(uid).update({
                                                        Totalbid: biddata + Number(1)

                                                    }).then(() => {
                                                        console.log('successfully bid');


                                                    })

                                                })
                                            } else {
                                                Product['productbid'] = 1;
                                                Product['time'] = date;
                                                fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).set(Product).then(() => {
                                                    console.log('successfully bid');

                                                }).then(() => {
                                                    fs.collection('Bid' + months[month] + year).doc(uid).update({
                                                        Totalbid: biddata + Number(1)

                                                    }).then(() => {
                                                        console.log('successfully bid');


                                                    })

                                                })

                                            }

                                        })

                                })
                        } else {
                            fs.collection('Bid' + months[month] + year).doc(uid).set({
                                Id: uid,
                                FullName: fullname,
                                Email: email,
                                Phone: phone,
                                ProfileImage: photo,
                                Totalbid: Number(1),
                                Created: date
                            }).then(() => {
                                Product['productbid'] = 1;
                                Product['time'] = date;
                                fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).set(Product).then(() => {

                                })

                            });
                        }
                        const docRef2 = fs.collection('NynepayBiddingToken').doc(uid);
                        docRef2.get().then((doc2) => {
                            if (doc2.exists) {
    
                                const data = {
                                    id:(now.toString),
                                    Created:date
                                  };
    
                                fs.collection('NynepayBiddingToken').doc(uid).collection('nbtlist').doc(now).set(data).then(() => {
    
                                }).catch((err)=>{console.log(err)})
                           
                              
                            } else {
                                fs.collection('NynepayBiddingToken').doc(uid).set({
                                    Id: uid,
                                    FullName: fullname,
                                    Email: email,
                                    Phone: phone,
                                    ProfileImage: photo,
                                    Totalbid: Number(1),
                                    Created: date
                                }).then(() => {
                                    fs.collection('NynepayBiddingToken').doc(uid).collection('nbtlist').set({
                                        id:now,
                                        Created:date
                                    }).then(() => {
    
                                    })
    
                                });
                            }
                        });  
                    });

                   
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
            props.history.push('/login');
        }
    }
    let Category;
    async function gotoPage(category) {
        Category = category;
        props.history.push(Category.categoryname);
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
                <Heading>Mobiles</Heading>
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

