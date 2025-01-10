type CardProps = {
    imageUrl: string;
    title: string;
    description: string;
    onClick: () => void;
  };
  
  export default function Card({ imageUrl, title, description, onClick }: CardProps) {
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onClick}>
              Read More
            </button>
          </div>
        </div>
      </div>
    );
  }
  