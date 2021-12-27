import Youtube from "react-youtube";
var getYoutubeId = require("get-youtube-id");

const YoutubeContainer = ({
  playTrailerFlag,
  setPlayerFlag,
  selectedMovies
}) => {
  return (
    <div className="hero-content max-center">
      {playTrailerFlag && (
        <button
          className={"button button--close"}
          onClick={() => setPlayerFlag(false)}
        >
          Close
        </button>
      )}
      {playTrailerFlag && (
        <Youtube
          videoId={getYoutubeId(`"${selectedMovies.TrailerURL}"`)}
          containerClassName="youtube-container"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0
            }
          }}
        />
      )}
      <button
        className="button"
        onClick={() => {
          setPlayerFlag(true);
        }}
      >
        Play Trailer{" "}
      </button>
      <h3 className="title">{selectedMovies.EventTitle}</h3>
      {selectedMovies.DispReleaseDate ? (
        <p className="hero-overview">{selectedMovies.DispReleaseDate} </p>
      ) : null}
    </div>
  );
};

export default YoutubeContainer;
