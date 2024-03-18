import { IMovie } from '../models/movie.model';

export const MOVIES_MOCK: IMovie[] = [
  {
    id: '1',
    title: 'Tatort',
    description: `Tatort is ARD's cult crime series. Here fans can find previews of new cases and reruns, plus videos and information about the commissioners.`,
    rating: 5,
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    userId: '1',
  },
  {
    id: '2',
    title: 'Polizeiruf',
    description: `Polizeiruf 110 is a German-language crime film series, which was produced since 1971 in the German Television (DFF; 1972-1990: Television of the GDR) and continued after the dissolution of the DFF from 1993 by various ARD stations.`,
    rating: 4,
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    userId: '1',
  },
];
