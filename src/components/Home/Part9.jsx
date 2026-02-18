import Image from "next/image";

const Part9 = () => {
    return(
        <div className="flex flex-col-reverse lg:flex-row px-[5%] lg:px-[14%] text-gray-600 pt-8 lg:pt-15 justify-center items-center">
            <div className="w-full lg:w-[50%] px-5 pt-0 lg:px-20 text-left lg:text-left">
                <h1 className="text-xl md:text-2xl pb-5 text-gray-600">Free Healing Crystals</h1>
                <p className="pb-4 text-gray-500 text-sm md:text-base">With every order, we include free healing crystal chips. These small, beautiful stones can easily fit in your bag, pocket, or anywhere you like.</p>
                <p className="pb-2 text-gray-500 font-semibold text-sm md:text-base">How to Use the Crystal Chips:</p>
                <p className="pb-1 text-gray-500 text-sm md:text-base">- Carry Them - Keep a few in your bag for daily energy boosts.</p>
                <p className="pb-1 text-gray-500 text-sm md:text-base">- Meditation - Use them during meditation to enhance your practice and focus your intentions.</p>
                <p className="pb-1 text-gray-500 text-sm md:text-base">- Decorate - Place them in a small dish at home or work for positive energy.</p>
                <p className="pb-1 text-gray-500 text-sm md:text-base">- Gift Them - Share with friends or family to spread the healing vibes.</p>
            </div>
            <div className="w-full lg:w-[50%] flex justify-center items-center border border-gray-100 mt-8 lg:mt-0 p-4 lg:p-0">
                <Image
                    src={`/Free_healing_crystals_aas.jpg`}
                    alt="Free healing crystals"
                    height={700}
                    width={700}
                    className="object-contain max-h-[60vh] max-w-full lg:max-h-[700px] lg:max-w-[700px]"
                />
            </div>
        </div>
    );
};

export default Part9;