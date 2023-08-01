
import CustomerInfo from './CustomerInfo'
import Cart from './Cart'
import BillInfo from './BillInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OrderConfirm = () => {

    const [cart, setCart] = useState(null)

    const getCartInfo = () => {
        const apiUrl = 'http://phpstack-924353-3259330.cloudwaysapps.com/api/v2/carts/63';
        const customHeaderName = 'Checkbox-Api-V2-Key';
        const customHeaderValue = '83324867-6668-4c04-bf36-91714ea8b3e3';
        const accessToken = '278|9loDyr1AF3j7W3HEj26Kr03bcRwAehpwKAqb09wz';

        // Axios GET request with custom header
        axios.get(apiUrl, {
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

    useEffect(() => {
        getCartInfo()
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
                        <BillInfo/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm