"use client";

type AccordionProps = {
  items: { title: string; content: string }[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-xl font-medium">{item.title}</div>
          <div className="collapse-content">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
