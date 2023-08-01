import { useEffect } from 'react'
import { BsPhone } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { ImLocation2 } from 'react-icons/im'

const CustomerInfo = ({customer}) => {

    const getAddress = () => {
        let address = customer?.address.address + ", " + customer?.address?.area.name + ", " + customer?.address?.district?.name
        return address;
    }

    return (
        <div className="p-10 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden h-auto" id="scroll">
            <p className="text-2xl font-black leading-10 text-gray-800 dark:text-white pt-3">Customer info</p>
            <div className="p-5">
                <div className="flex items-center gap-2">
                    <FiUser/>
                    <span>{customer?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BsPhone/>
                    <span>{customer?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ImLocation2/>
                    <span>{getAddress()}</span>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo