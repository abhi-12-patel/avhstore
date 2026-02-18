import Image from "next/image";

const Part6 = () => {
    return(
        <div className="flex flex-col lg:flex-row justify-center items-center px-[5%] lg:px-[14%] text-gray-600">
            <div className="w-full lg:w-auto flex justify-center">
                <Image
                    src={`/Cream_Black_Minimalist.png`}
                    alt="Cream Black Minimalist"
                    height={700} // Base height
                    width={550} // Base width
                    // Use `sizes` and `fill` for better responsive image handling
                    // or define specific responsive widths using Tailwind's w-[] for the parent div
                    className="object-contain max-h-[50vh] lg:max-h-[700px] w-auto lg:w-[550px]"
                />
            </div>
            <div className="pt-8 lg:pt-0 lg:pl-20 px-5 lg:pr-10 text-left lg:text-left">
                <h1 className="text-2xl pb-5">Sustainable Packaging</h1>
                <div className="text-gray-500 font-extralight">
                    <p className="pb-4">Our Dream, Your Treasure: The Story Behind Our Wooden Celestial Boxes</p>
                    <p className="pb-4">Every product has a story, and ours is one of passion, dreams, and artistry. Our journey began with a vision to create something unique and meaningful—something that would bring beauty and joy into people’s lives.</p>
                    <p className="pb-4">The celestial engravings in brass on each box are carefully handcrafted crafted to evoke the mystery and magic of the night sky.</p>
                    <p className="pb-4">Inspired by the wonders of the cosmos and the timeless allure of celestial motifs, we set out to design boxes that would not only serve as functional storage but also as beautiful pieces of art. 🌙✨</p>
                </div>
            </div>
        </div>
    );
}

export default Part6;