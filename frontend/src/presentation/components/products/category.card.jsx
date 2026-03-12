const CategoryCard = ({ name, image, count }) => {
  return (
    <div
      className="group relative bg-feature-card rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:shadow-card"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {image ?
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500
              group-hover:scale-105"
          />
        : <div className="w-full h-full bg-gradient-to-br from-shadow-start to-shadow-end flex items-center justify-center">
            <span className="text-4xl font-light text-icon">
              {name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        }
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-base font-semibold text-white">{name}</h3>
        {count !== undefined && (
          <p className="text-xs text-white/70 mt-1">{count} products</p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
