import axios from 'axios';
import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

const ShopInfo = () => {

    const [image, setImage] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [bkash, setBkash] = useState(null)

    const addShopInfo = () => {
        const formData = new FormData();
        formData.append('bkash', bkash);
        formData.append('shop_name', shopName);
        formData.append('shop_image', image);

        axios.post(axios.defaults.baseURL+'auth/add-shop-information', formData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }

  return (
    <div className="flex flex-col md:flex-col md:items-center md:justify-between border-3 mt-20">
        <div>
            <div className="mb-5 text-center">
                <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                    <img id="image" className="object-cover w-full h-32 rounded-full"
                        src={image && URL.createObjectURL(image)}
                    />
                </div>
                
                <label 
                    htmlFor="fileInput"
                    type="button"
                    className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                        <circle cx="12" cy="13" r="3" />
                    </svg>						
                    Browse Photo
                </label>

                <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">Click to add shop image</div>

                <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" onClick={(e) => setImage(e.target.files[0])}/>
            </div>

            <div className="mb-5">
                <label htmlFor="firstname" className="font-bold mb-1 text-gray-700 block">Shop name</label>
                <input type="text"
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    placeholder="Enter your shop name..."
                    onChange={(e) => setShopName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Bkash number</label>
                <input type="email"
                    className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    placeholder="Enter your baksh number..." 
                    onChange={(e) => setBkash(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <button className="flex justify-center items-center gap-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium
                text-gray-900 focus:outline-none bg-white rounded-lg border
                border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
                focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                dark:hover:text-white dark:hover:bg-gray-700"
                onClick={addShopInfo}
            >
                Add shop info
                <BsArrowRight/>
            </button>
            </div>

        </div>
    </div>
  )
}

export default ShopInfo