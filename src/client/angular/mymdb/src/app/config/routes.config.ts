const baseUrl = 'https://localhost:7065/api/';

export const IDENTITY_ROUTES = {
  signUp: baseUrl + 'accounts/sign-up-user',
  signIn: baseUrl + 'accounts/sign-in-user',
};

export const ADMIN_ROUTES = {
  loadMovies: baseUrl + 'admin/movies',
  deleteMovie: baseUrl + 'admin/movies',
  updateMovie: baseUrl + 'admin/movies/update-movie',
  loadUsers: baseUrl + 'admin/accounts',
  deleteUser: baseUrl + 'admin/accounts',
};

export const MOVIE_ROUTES = {
  loadMovies: baseUrl + 'movies',
  deleteMovie: baseUrl + 'movies',
  createMovie: baseUrl + 'movies/create-movie',
  updateMovie: baseUrl + 'movies/update-movie',
};
