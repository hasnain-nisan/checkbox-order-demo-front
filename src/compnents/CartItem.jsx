
const CartItem = ({item}) => {
    return (
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8">
            <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img 
                    // src={item?.product_thumbnail_image}
                    src="data:image/jpeg;base64,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" 
                    alt="Black Leather Bag" 
                    className="h-full object-center object-cover md:block hidden" 
                />
            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <div className="flex items-center gap-3 w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                        {item?.product_name} (#{item?.product_code})
                    </p>
                </div>
                {/* <div>
                    {
                        item?variations.map(variation => {
                            return (
                                <>
                                    <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
                                    <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
                                </>
                            )
                        })
                    }
                </div> */}
                <div className="flex items-center justify-between pt-5">
                    <p className="font-black leading-none text-gray-800 dark:text-white">1</p>
                    <p className="font-black leading-none text-gray-800 dark:text-white">$9,000</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem