const Filter = ({ movieFilter, callBackFunc, setGenre }) => {
  // handleChange function for two drop-down (Language and Genre)
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    switch (field) {
      case "language":
        callBackFunc(value);
        break;
      case "genre":
        setGenre(value);
        break;
      default:
        break;
    }
  };

  // Mapping the language list from movie object
  const language_list = Object.keys(movieFilter).map(
    (obj, index) => movieFilter[obj].EventLanguage
  );

  // Mapping the genre list from movie object
  const genre_list = Object.keys(movieFilter).map(
    (obj, index) => movieFilter[obj].EventGenre
  );

  // Removes duplicates from language and genre list
  const filter_lists = (value) =>
    value.filter((type, index) => value.indexOf(type) === index);

  return (
    <div className="select-drop">
      <h2 className="filter_header"> Filters </h2>
      <p className="font">Select Language</p>
      <select
        className="drop-down"
        id="language"
        onChange={handleChange("language")}
      >
        <option value="">All Languages</option>
        {filter_lists(language_list).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <p className="font">Select Genre</p>
      <select className="drop-down" id="Genre" onChange={handleChange("genre")}>
        <option value="">All Genre</option>
        {filter_lists(genre_list).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
