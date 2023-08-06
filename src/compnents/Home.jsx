import { useNavigate } from "react-router-dom"
import {BsArrowRight} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'
import {BsPhone} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import CustomerInfo from "./CustomerInfo"
import Cart from "./Cart"
import BillInfo from "./BillInfo"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null)

    const getUserInfo = () => {
        // Axios GET request with custom header
        axios.get(axios.defaults.baseURL+'auth/user')
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            setUserInfo(response.data.data)
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getUserInfo()
    }, [])



    return (
        <div className='w-full mt-10 flex justify-center h-[100vh]'>
            <button className="flex justify-center items-center gap-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium
                text-gray-900 focus:outline-none bg-white rounded-lg border
                border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
                focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => navigate('/order-confirmation')}
            >
                Order confirmation
                <BsArrowRight/>
            </button>
        </div>
    )
}

export default Home