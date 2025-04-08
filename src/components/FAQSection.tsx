import Accordion from "./Accordian";

export default function FAQSection() {
  const faqItems = [
    {
      title: "How do I start blogging on VerseVault?",
      content: "Sign up for an account, and click on 'Post a Blog' to get started.",
    },
    {
      title: "Is VerseVault free to use?",
      content: "Yes, VerseVault is completely free to use for reading and posting blogs.",
    },
    {
      title: "Can I edit or delete my blogs?",
      content: "Absolutely! Go to your profile to edit or delete your blogs anytime.",
    },
  ];

  return (
    <section className="py-16 bg-base-200 text-center">
      <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto px-6 text-pretty">
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
