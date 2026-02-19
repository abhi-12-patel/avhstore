import Image from "next/image"

const Size = () => {
    return(
        <div className="flex-col bg-white pt-20 lg:py-15 max-w-2xl justify-self-center justify-center items-center mainCatgeroryContainer">
            <h1 className="text-4xl py-10 text-black">Size Guide ( USA guide )</h1>
            <Image
            src="/1.jpg"
            height={5000}
alt="size"
            width={350}
            className="flex justify-self-center"
            />
            <Image
            src="/2.png"
            height={5000}
alt="size"
            width={500}
            />
            <Image
            src="/3.png"
            height={5000}
alt="size"
            width={500}
            />
            <Image
            src="/4.png"
            height={5000}
alt="size"
            width={500}
            />
            <Image
            src="/5.png"
            height={5000}
alt="size"
            width={500}
            />
            <Image
            src="/6.jpg"
            height={5000}
alt="size"
            width={500}
            />
        </div>
    )
}
export default Size