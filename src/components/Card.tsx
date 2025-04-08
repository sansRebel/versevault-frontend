'use client';

import Button from '@/components/Button';

type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
};

export default function Card({ imageUrl, title, description, onClick }: CardProps) {
  return (
    <div className="group bg-[#1e1e1e] text-white rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:scale-[1.015]">
      {/* Card Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>

        {/* Card Actions */}
        <div className="flex justify-end mt-2">
          <Button label="Read More" styleType="primary" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
