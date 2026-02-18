import ImageSlider from "@/components/Home/Part1";
import Part10 from "@/components/Home/Part10/Part10";
import Part11 from "@/components/Home/Part11";
import Part12 from "@/components/Home/Part12";
import Part13 from "@/components/Home/Part13/Part13";
import Part3 from "@/components/Home/Part3/Part3";
import Part4 from "@/components/Home/Part4/Part4";
import Part5 from "@/components/Home/Part5/Part5";
import Part6 from "@/components/Home/Part6";
import Part7 from "@/components/Home/Part7";
import Part8 from "@/components/Home/Part8";
import Part9 from "@/components/Home/Part9";
import Image from "next/image";

const logo = `/uytp.jpg`

export default function Home() {
  return (
   <div className="bg-white pt-20 lg:pt-0">
    <ImageSlider/>
    <Image
      src={logo}
      alt="TARAKAYA Artificial Logo"
      width={2000} // Adjust as needed
      height={50} // Adjust as needed
      className=" w-full"
    />
    <Part3/>
    <Part5/>
    {/* <Part4/> */}
    {/* <Part6/> */}
    <Part7/>
    {/* <Part8/> */}
    {/* <Part9/> */}
    {/* <Part10/> */}
    {/* <Part11/> */}
    <Part12/>
    {/* <Part13/> */}
   </div>
  );
}
