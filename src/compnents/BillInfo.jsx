/* eslint-disable react/prop-types */
import axios from "axios"
import {MdDelete} from 'react-icons/md'
import { useEffect, useState } from "react"
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const BillInfo = ({cart, otherFees, userInfo}) => {

    let total_collection_amount = (cart?.reseller_to_customer_price - cart?.advance_from_customer)
    let supplier_amount = cart?.price
    let processing_fees = otherFees?.processing_fee.amount
    let shipping_fee = otherFees?.shipping_fee
    let payableAmount = 0;

    const [couponCode, setCouponCode] = useState("")
    const [coupon, setCoupon] = useState(null)
    const [total_earn, set_total_earn] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const calculateTotalEarnings = () => {
        console.log(coupon);
        if(coupon){
            if (coupon?.type === 'cashback') {
                set_total_earn((total_collection_amount - (supplier_amount + processing_fees + shipping_fee)) + (coupon?.amount * (-1)));
            } else {
                set_total_earn((total_collection_amount - (supplier_amount + processing_fees + shipping_fee) )- (coupon?.amount * (-1)));
            }
        } else {
            set_total_earn(total_collection_amount - (supplier_amount + processing_fees + shipping_fee))
        }

        // if(userInfo?.numb_of_orders === 0 && total_earn >= 0){
        //     set_total_earn((prevTotalEarn) => {
        //     // Perform your calculations here using prevTotalEarn and discount
        //     // For example, if you want to add the discount to the previous total_earn
        //         return prevTotalEarn - shipping_fee;
        //     });
        // }
    };

    const applyCoupon = () => {
        const requestData = {
            cart_id: '13',
            coupon_code: couponCode,
        };

        // Axios POST request with custom header and authentication bearer token
        axios.post(axios.defaults.baseURL+'coupon-apply', requestData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            setCoupon(response.data.data)
            calculateTotalEarnings()
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const removeCoupon = () => {
        const requestData = {
            cart_id: '13'
        };

        // Axios POST request with custom header and authentication bearer token
        axios.post(axios.defaults.baseURL+'coupon-remove', requestData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            setCouponCode("")
            setCoupon(null)
            calculateTotalEarnings()
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const submitOrder = () => {
        // Axios GET request with custom header
        const requestData = {
            cart_id: 13,
            processing_fee: processing_fees,
            delivery_charge: shipping_fee,
            coupon_type: coupon?.voucher_type,
            coupon_amount: coupon?.amount
        };

        if(!userInfo.shop){
            setModalIsOpen(true)
        } else if(total_earn < 0 || userInfo?.numb_of_orders === 0  ){
            payAndOrder(requestData)
        } else {
            orderNow(requestData)
        }
    }

    const genSubmitOrderBtnText = () => {
        if(total_earn < 0){
            return `Pay ${total_earn * (-1)} tk. and Order`
        } else if(userInfo?.numb_of_orders === 0){
            return `Pay ${shipping_fee} tk. and Order`
        } else {
            return "Order now"
        }
    }

    const orderNow = (requestData) => {
        axios.post(axios.defaults.baseURL+'order/store', requestData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const payAndOrder = (requestData) => {
        axios.get(axios.defaults.baseURL+"sslcommerz/begin", {
            params: {
                payment_type: "due_payment",
                amount: 60,
                cart_id: 13,
                processing_fee: processing_fees,
                delivery_charge: shipping_fee,
                success_url: "http://127.0.0.1:5173/order-success",
                fail_url: "http://127.0.0.1:5173/order-confirmation",
                cancel_url: "http://127.0.0.1:5173/order-confirmation"
            }
        })
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            window.location.href = response.data.url
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const showShopModal = () => {

    }

    useEffect(() => {
        calculateTotalEarnings()
        if(cart?.coupon){
            setCoupon({
                coupon_code: cart?.coupon?.code,
                voucher_type: cart?.coupon?.cashback_discount,
                amount: cart?.discount
            })
        }
    }, [cart])

    return (
        <>
            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                <div>
                    <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
                    <div className="flex items-center justify-between pt-16 font-bold">
                        <p className="text-base leading-none text-gray-800 dark:text-white">Total Collection Amount</p>
                        <p className="text-base leading-none text-gray-800 dark:text-white">
                            {total_collection_amount} TK.
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-5 font-bold">
                        <p className="text-base leading-none text-gray-800 dark:text-white">Supplier Amount</p>
                        <div className={"text-base leading-none text-gray-800 dark:text-white"}>
                            {
                                coupon?.voucher_type === 'discount' ? (
                                    <>
                                        <p className="line-through text-right">{supplier_amount} TK.</p>
                                        <p className="">(-) {supplier_amount - coupon?.amount} TK.</p>
                                    </>
                                ) : (
                                    <p className="">(-) {supplier_amount} TK.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-5 font-bold">
                        <p className="text-base leading-none text-gray-800 dark:text-white">Processing Fee</p>
                        <p className="text-base leading-none text-gray-800 dark:text-white">
                            (-) {processing_fees} TK.
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-5 font-bold">
                        <p className="text-base leading-none text-gray-800 dark:text-white">Shipping Fee</p>
                        <p className="text-base leading-none text-gray-800 dark:text-white">
                            (-) {shipping_fee} TK.
                        </p>
                    </div>
                    {
                        !coupon ? (
                            <div className="flex items-center justify-between pt-5 font-semibold">
                                <input className="w-full border-2 border-gray-800 h-12 p-3" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                                <button className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                                    onClick={applyCoupon}
                                >
                                    <svg aria-hidden="true" data-prefix="fas" data-icon="gift" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"/></svg>
                                    <span className="font-medium">Apply coupon</span>
                                </button>
                            </div>
                        ) : null
                    }
                    {
                        coupon?.voucher_type === 'cashback' ? (
                            <div className="flex items-center justify-between pt-5 font-bold">
                                <p className="text-base leading-none text-gray-800 dark:text-white">Cashback</p>
                                <p className="text-base leading-none text-gray-800 dark:text-white">
                                    (+) {coupon?.amount} TK.
                                </p>
                            </div>
                        ) : null
                    }
                    {
                        coupon ? (
                            <div className="flex items-center justify-between pt-5 font-bold">
                                <p className="text-base leading-none text-gray-800 dark:text-white">Coupon</p>
                                <div className="flex items-center">
                                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        {coupon?.coupon_code}
                                    </span>
                                    <MdDelete className="text-red-800 cursor-pointer" onClick={removeCoupon}/>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                        <p className="text-2xl leading-normal text-gray-800 dark:text-white">Total Earnings</p>
                        <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                            {total_earn} TK.
                        </p>
                    </div>
                    <button 
                        onClick={submitOrder}
                        className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                    >
                        {genSubmitOrderBtnText()}
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={() => setModalIsOpen(false)}>close</button>
                <div>I am a modal</div>
                <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
                </form>
            </Modal>
        </>
    )
}

export default BillInfo