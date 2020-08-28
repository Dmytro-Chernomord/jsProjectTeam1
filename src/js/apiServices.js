export default {
  //   searchQuery: '',
  page: 1,
  apiKey: '89b9004c084fb7d0e8ffaadd17cb8254',
  total: 0,
  type: "popular",

  getOneMovieInfo(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.apiKey}&language=en-US`;
    return fetch(url).then(res => res.json());
  },
  getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/${this.type}?api_key=${this.apiKey}&language=en-US&page=${page}&`;
    return fetch(url).then(res => res.json());
  },
  getMoviesBySearch(search) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=1`;
    return fetch(url).then(res => res.json());
  },
  getGenre() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    return fetch(url)
      .then(res => res.json())
      .then(gen => gen.genres);
  },
  changeType(type) {
    if (type === "popular") {
      this.type = "popular";
    }
    if (type === "top_rated") {
      this.type = "top_rated";
    }
    if (type === "upcoming") {
      this.type = "upcoming";
    }
  }
  //   resetPage() {
  //     this.page = 1;
  //   },
  //   get query() {
  //     return this.searchQuery;
  //   },
  //   set query(value) {
  //     this.searchQuery = value;
  //   },
};
