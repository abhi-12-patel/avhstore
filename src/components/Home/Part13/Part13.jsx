'use client';

import { useEffect, useRef, useState } from 'react';
import Part13Common from './Part13Common';

const Part13 = () => {
  /* ---------- product list (unchanged) ---------- */
  const products = [
    { id: 1,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/1'  },
    { id: 2,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/2'  },
    { id: 3,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/3'  },
    { id: 4,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/4'  },
    { id: 5,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/5'  },
    { id: 6,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/6'  },
    { id: 7,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/7'  },
    { id: 8,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/8'  },
    { id: 9,  imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/9'  },
    { id: 10, imageUrl: '/70048E73-FC04-4A94-A59C-374E7A399E9B.jpg', linkHref: '/product/10' },
  ];

  /* ---------- required order (1 3 5 … / 2 4 6 …) ---------- */
  const topRowAll    = products.filter((_, i) => i % 2 === 0);
  const bottomRowAll = products.filter((_, i) => i % 2 === 1);

  /* ---------- measure how many full cards fit per row ---------- */
  const rowRef = useRef(null);
  const [itemsPerRow, setItemsPerRow] = useState(products.length);

  useEffect(() => {
    const calc = () => {
      const row = rowRef.current;
      if (!row) return;

      const firstCard = row.querySelector('a, div, span, img');
      if (!firstCard) return;

      const rowWidth  = row.offsetWidth;
      const cardWidth = firstCard.offsetWidth;
      const gap       = 1; // 1‑pixel gap between cards

      const maxPerRow = Math.floor((rowWidth + gap) / (cardWidth + gap));
      setItemsPerRow(maxPerRow);
    };

    calc();               // run once on mount
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const topRow    = topRowAll.slice(0, itemsPerRow);
  const bottomRow = bottomRowAll.slice(0, itemsPerRow);

  /* ---------- render ---------- */
  return (
    <div
      className="text-gray-600 px-2 ld:px-[14%] pb-8 pt-4"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <h1 className="flex justify-self-center text-2xl py-[2%]">
        Follow us on Instagram
      </h1>

      {/* space‑y‑px keeps 1 px gap between the two rows */}
      <div className="space-y-px">
        {/* top row */}
        <div
          ref={rowRef}
          className="flex flex-nowrap justify-center gap-px overflow-hidden"
        >
          {topRow.map((p) => (
            <div key={p.id} className="shrink-0">
              <Part13Common imageUrl={p.imageUrl} linkHref={p.linkHref} />
            </div>
          ))}
        </div>

        {/* bottom row */}
        <div className="flex flex-nowrap justify-center gap-px overflow-hidden">
          {bottomRow.map((p) => (
            <div key={p.id} className="shrink-0">
              <Part13Common imageUrl={p.imageUrl} linkHref={p.linkHref} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Part13;
