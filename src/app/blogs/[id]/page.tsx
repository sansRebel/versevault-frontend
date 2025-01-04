import Button from "@/components/Button";

export default function BlogDetailsPage() {
    return (
        <div className="min-h-screen bg-base-100">
        <section className="py-8">
          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex flex-col items-center">
              <h1 className="text-5xl font-bold mb-4">Blog Title</h1>
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Blog Cover"
                className="w-full max-w-4xl rounded-lg shadow-md"
              />
            </div>
          </header>
  
          {/* Blog Content */}
          <article className="px-4 lg:px-24">
            <p className="text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              interdum ipsum dolor, at volutpat eros pharetra non. Sed tempor,
              urna eget tincidunt feugiat, libero dolor hendrerit nisi, ut
              ultricies sem lectus quis neque.
            </p>
            <p className="text-lg">
              Integer vehicula tincidunt mi, et interdum justo eleifend eu.
              Aliquam erat volutpat. Nam at sapien sapien. Curabitur euismod eros
              sit amet leo vestibulum, in hendrerit nisl varius.
            </p>
          </article>
  
          {/* Actions */}
          <div className="flex justify-center gap-4 my-8">
            <Button label="Like" styleType="primary" />
            <Button label="Comment" styleType="secondary" />
          </div>
  
          {/* Comments Section */}
          <section className="px-4 lg:px-24">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg shadow">
                <p>
                  <strong>User1:</strong> This is a great blog post!
                </p>
              </div>
              <div className="p-4 bg-base-200 rounded-lg shadow">
                <p>
                  <strong>User2:</strong> I learned a lot from this. Thank you!
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>

    )
}