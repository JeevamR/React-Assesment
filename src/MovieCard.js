import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DefaultPreview1 from "../src/DefaultPreview1.jpg";

const MovieCard = ({ movie, selectMovie }) => {
  // on select of any movie card, scrolls to top of window
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className="movie-card"
      onClick={() => {
        selectMovie(movie);
        scrollTop();
      }}
    >
      <LazyLoadImage
        effect="blur"
        className="movie-cover"
        src={movie.EventImageUrl}
        alt=""
        onError={(event) => {
          event.target.src = DefaultPreview1;
          event.onerror = null;
        }}
      />

      <h2 className="movie-title">{movie.EventTitle}</h2>
    </div>
  );
};

export default MovieCard;
