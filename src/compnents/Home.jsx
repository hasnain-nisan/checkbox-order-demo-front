import { useNavigate } from "react-router-dom"
import {BsArrowRight} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'
import {BsPhone} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import CustomerInfo from "./CustomerInfo"
import Cart from "./Cart"
import BillInfo from "./BillInfo"

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full mt-10 flex justify-center'>
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