
const CartItem = ({item}) => {
    return (
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8">
            <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img src={item?.product_thumbnail_image} alt="Black Leather Bag" className="h-full object-center object-cover md:block hidden" />
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