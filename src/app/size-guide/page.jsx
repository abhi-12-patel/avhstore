import Image from "next/image";

const sizeTips = [
  "Measure finger size at the end of the day for best accuracy.",
  "Avoid measuring right after exercise or in very cold conditions.",
  "If your size falls between two options, choose the larger size.",
  "Use an existing comfortable ring to compare with the chart.",
];

const Size = () => {
  return (
    <div className="bg-[#fcfbf8] pt-20 lg:pt-14 pb-16 mainCatgeroryContainer">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h1 className="text-[clamp(1.8rem,5vw,3.1rem)] text-[#1f1b16] text-center font-semibold">
          Size Guide (USA)
        </h1>

        <p className="mt-3 text-center text-sm text-gray-600">
          Match your ring with the charts below for accurate size selection.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Quick Tips</h2>
          <ul className="mt-3 grid gap-2 text-gray-700 sm:grid-cols-2">
            {sizeTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 shadow-sm">
          <Image
            src="/1.jpg"
            height={5000}
            alt="Size guide chart 1"
            width={350}
            className="mx-auto"
          />
          <Image
            src="/2.png"
            height={5000}
            alt="Size guide chart 2"
            width={500}
            className="mx-auto"
          />
          <Image
            src="/3.png"
            height={5000}
            alt="Size guide chart 3"
            width={500}
            className="mx-auto"
          />
          <Image
            src="/4.png"
            height={5000}
            alt="Size guide chart 4"
            width={500}
            className="mx-auto"
          />
          <Image
            src="/5.png"
            height={5000}
            alt="Size guide chart 5"
            width={500}
            className="mx-auto"
          />
          <Image
            src="/6.jpg"
            height={5000}
            alt="Size guide chart 6"
            width={500}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Size;
