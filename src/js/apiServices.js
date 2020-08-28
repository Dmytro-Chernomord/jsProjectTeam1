export default {
  //   searchQuery: '',
  page: 1,
  apiKey: '89b9004c084fb7d0e8ffaadd17cb8254',
  total: 0,
  type: 'popular',
  language: 'en-US',


  async getOneMovieInfo(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.apiKey}&language=${this.language}`;
    const res = await fetch(url);
    return await res.json();
  },
  async getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/${this.type}?api_key=${this.apiKey}&language=${this.language}&page=${page}&`;
    const res = await fetch(url);
    return await res.json();
  },
  async getMoviesBySearch(search) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${search}&page=1`;
    const res = await fetch(url);
    return await res.json();
  },
  async getGenre() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`;
    const res = await fetch(url);
    const gen = await res.json();
    return gen.genres;

  },
  changeType(type) {
    if (type === 'popular') {
      this.type = 'popular';
    }
    if (type === 'top_rated') {
      this.type = 'top_rated';
    }
    if (type === 'upcoming') {
      this.type = 'upcoming';
    }
  },
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
