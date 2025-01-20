"use client";

import Button from "@/components/Button";

type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
};

export default function Card({ imageUrl, title, description, onClick }: CardProps) {
  return (
    <div className="card bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 rounded-lg overflow-hidden">
      {/* Card Image */}
      <figure>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </figure>

      {/* Card Body */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <Button
            label="Read More"
            styleType="primary"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
