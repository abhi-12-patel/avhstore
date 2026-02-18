import Image from "next/image";

const Part8 = () => {
    return(
        <div className="flex flex-col lg:flex-row px-[5%] lg:px-[14%] text-gray-600 justify-center items-center py-8">
            <div className="w-full lg:w-[50%] flex justify-center items-center border border-gray-100 p-4 lg:p-0">
                <Image
                    src={`/aas.jpg`}
                    alt="aas"
                    height={600}
                    width={600}
                    className="object-contain max-h-[60vh] max-w-full lg:max-h-[600px] lg:max-w-[600px]"
                />
            </div>
            <div className="w-full lg:w-[50%] px-5 pt-8 lg:pt-0 lg:px-20 text-left lg:text-left">
                <h1 className="text-xl md:text-2xl pb-5">This shiva card specially designed by Mansi priya (founder)</h1>
                <p className="pb-4 text-gray-500 text-sm md:text-base">You can keep this card in your wallet, desk, phone cover, etc.</p>
                <p className="pb-4 text-gray-500 text-sm md:text-base">(Note - you can tell us if you don't want it while placing order - we are not imposing our religion beliefs on anyone)</p>
            </div>
        </div>
    )
}
export default Part8;