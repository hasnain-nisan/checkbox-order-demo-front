
import CustomerInfo from './CustomerInfo'
import Cart from './Cart'
import BillInfo from './BillInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OrderConfirm = () => {

    const apiUrl = 'http://localhost/checkbox-v2/api/v2/';
    const customHeaderName = 'Checkbox-Api-V2-Key';
    const customHeaderValue = '83324867-6668-4c04-bf36-91714ea8b3e3';
    const accessToken = '51|mcDG2AWWgN7m1oAlH5I4E9wQ0GB82eMvePsNUMnB';

    const [cart, setCart] = useState(null)
    const [otherFees, setOtherFees] = useState(null)

    const getCartInfo = () => {
        // Axios GET request with custom header
        axios.get(apiUrl+"carts/13", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                [customHeaderName]: customHeaderValue,
            }
        })
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            setCart(response.data.data)
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const updateCartInfo = () => {
        // Axios GET request with custom header
        const requestData = {
            type: 'bill_info',
            reseller_to_customer_price: 10000,
            advance_from_customer: 100
        };

        // Axios POST request with custom header and authentication bearer token
        axios.post(apiUrl+'carts/update/13', requestData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                [customHeaderName]: customHeaderValue,
            }
        })
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    const getOtherFees = () => {
        // Axios GET request with custom header
        axios.get(apiUrl+'carts/get-other-fees/13', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                [customHeaderName]: customHeaderValue,
            }
        })
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            setOtherFees(response.data.data)
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getCartInfo()
        getOtherFees()
        // updateCartInfo()
    }, [])

    return (
        <div className="w-full h-full bg-white bg-opacity-90 top-0 overflow-y-auto" id="chec-div">
            <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                <div className="flex lg:flex-row flex-col justify-end" id="cart">
                    <div className="w-1/2">
                        <CustomerInfo customer={cart?.customer}/>
                        <Cart items={cart?.items}/>
                    </div>
                    <div className="w-1/2 bg-gray-100 dark:bg-gray-900 h-full">
                        <BillInfo cart={cart} otherFees={otherFees}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm