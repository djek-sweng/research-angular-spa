export interface IMovie {
  id?: string;
  title: string;
  description?: string;
  rating: number;
  imageUrl: string;
  userId?: string;
  updatedAt?: string;
}

export const MOVIE_EMTPY: IMovie = {
  title: '',
  rating: -1,
  imageUrl: '',
};
