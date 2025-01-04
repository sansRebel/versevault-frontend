"use client";

import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useState } from "react";

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Navigated to page ${page}`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-8">
        <h2 className="text-4xl font-bold text-center mb-8">All Blogs</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input input-bordered w-full max-w-md"
          />
        </div>

        <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
