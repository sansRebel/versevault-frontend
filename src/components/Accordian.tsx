'use client';

type AccordionProps = {
  items: { title: string; content: string }[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="collapse collapse-arrow bg-[#1e1e1e] border border-gray-700 rounded-lg transition-all duration-300"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-lg font-semibold text-white peer-checked:text-purple-400">
            {item.title}
          </div>
          <div className="collapse-content text-gray-300">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
