import Hero from "@/components/Hero";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Blogs */}
      <section className="py-8 bg-base-100">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Blogs</h2>
        <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example Cards */}
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </div>
  );
}
