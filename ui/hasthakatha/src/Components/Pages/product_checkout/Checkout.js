import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"
import { useSelector, useDispatch } from 'react-redux'
import Empty_checkout from './Empty_checkout'
import Axios from 'axios';
import Loader from '../../Shared/loader/Loader';
import { cartItems } from '../../../Redux/actions/index';
import logo from '../../../Images/logo.png'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { toast } from 'react-toastify';
import Address from './Address';
import Delivery from './Delivery';
function Checkout() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    const [data, setData] = useState({
        discount: "0",
        tax: "0",
        totalAmount: "0",
        deliveryAddress: '',
        deliveryType: ''
    });
    const [accordianInstance, setAccordianInstance] = useState('');

    const [cartData, setCartData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [checkoutPaymentDetails, setCheckoutPaymentDetails] = useState([]);

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const numberOfItems = useSelector((state) => state.cartItems.numberOfItems);
    const getCart = (userId) => {
        setLoading(true);
        Axios.all([
            Axios.get('/rest/add_to_cart/' + userId),
            Axios.get("/rest/add_to_cart_price_calculate/" + userId),
            Axios.get('/rest/add_to_cart/number_of_items/' + userId)
        ]).then(res => {
            if (res && res.length > 0) {
                setCartData(res[0].data.output);
                setData(res[1].data);
                const numberOfItems = res[2].data.number_of_items;
                dispatch(cartItems(numberOfItems));
                setLoading(false);
                collaps();
            }
        });
    }
    const collaps = () => {
        const collaps1 = document.getElementById("collaps");
        var elems = collaps1.querySelectorAll('.collapsible');
        var options = '';
        var instances = M.Collapsible.init(elems, options);
        var accordianInstance = instances && instances.length > 0 ? instances[0] : '';
        setAccordianInstance(accordianInstance);
    }
    useEffect(() => {
        getCart(userId)
    }, []);

    const handleSubmit = () => {
        Axios.post('/rest/creating_order', {
            amount: data.totalAmount,
            deliveryAddress: data.deliveryAddress,
            deliveryType: 1,
            data: cartData.map(cart => {
                return {
                    price: cart.price,
                    pid: cart.pid,
                    quantity: cart.quantity,
                    id: cart.id,
                    title: cart.title
                }
            }),
            uid: userId
        }).then(res => {
            // console.warn("check response data of order:",res.data);
            setCheckoutPaymentDetails(res.data);
            launchRazorPay(res.data);
        });
    };

    const setDeliveryAddress = (deliveryAddress) => {
        setData({...data, deliveryAddress});
        if (accordianInstance) {
            accordianInstance.open(2);
        }
    };

    const setDeliveryType = (deliveryType) => {
        setData({...data, deliveryType});
        handleSubmit();
    };

    const launchRazorPay = (checkoutPaymentDetails) => {
        var options = {
            "key": checkoutPaymentDetails.key_id, // Enter the Key ID generated from the Dashboard
            "amount": checkoutPaymentDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": checkoutPaymentDetails.currency,
            "name": checkoutPaymentDetails.name,
            "description": checkoutPaymentDetails.description,
            "image": logo,
            "order_id": checkoutPaymentDetails.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                Axios.post('/rest/payment_status', {
                    userid: userId,
                    order_id: checkoutPaymentDetails.order_id,
                    razorpay_order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                }).then(res => {
                    console.log(res.data.message);
                    toast.success(<span ><FontAwesomeIcon icon={faCheck} size='lg' color="white" className="icon toast-icon" />  Success</span>)
                    document.location.href = '/#/orderdetails/' + checkoutPaymentDetails.order_id
                });
            },
            "prefill": {
                "name": "check razor pay hasthakatha",
                "email": "hasthakatha@gmail.com",
                "contact": "9147785762"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            "modal": {
                "ondismiss": function () {
                    console.log('Checkout form closed');
                }
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
        });
        rzp1.open();
        // e.preventDefault();
    }

    const gotoAddressSection = () => {
        if (accordianInstance) {
            accordianInstance.open(1);
        }
    }
    return (
        <>
            <Header />
            <div className="hk-container">
                {Loading ? <div className="loader checkout"><Loader /></div> :
                    numberOfItems ?
                        <div>
                            <div className="header-checkout">
                                <h2>{numberOfItems} items in your basket</h2>
                                <NavLink to="/shop" className="keep-shopping">
                                    Keep Shopping
                                </NavLink>
                            </div>

                            <div className="row" id="collaps">
                                <div className="col s8" >
                                    <ul class="collapsible">
                                        <li className="active">
                                            <div class="collapsible-header">Items</div>
                                            <div class="collapsible-body">
                                                {
                                                    cartData.map((data) => {
                                                        return (
                                                            // <h1>{data.cardData.title}</h1>
                                                            <Checkout_card_item
                                                                producttitle={data.title}
                                                                productprice={data.price}
                                                                productimg={data.img_url}
                                                                id={data.id}
                                                                pid={data.pid}
                                                                getCart={getCart}
                                                                quantity={data.quantity}
                                                                imgdata={data.image_data}
                                                            />
                                                        )
                                                    })
                                                }
                                                <button className="waves-effect waves-light btn btn-color" onClick={gotoAddressSection}>Continue</button>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="collapsible-header">Address</div>
                                            <div class="collapsible-body">
                                                <Address setDeliveryAddress={setDeliveryAddress} />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="collapsible-header">Delivery</div>
                                            <div class="collapsible-body">
                                                <Delivery checkout={handleSubmit} setDeliveryType={setDeliveryType}/>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                <div className="col s4">
                                    <Checkout_card data={data}  />
                                </div>
                            </div>
                        </div> : <Empty_checkout />}
            </div>
            <Footer />
        </>
    );
}

export default Checkout;
