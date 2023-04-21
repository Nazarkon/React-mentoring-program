import React from 'react';

import MovieDetails from './MovieDetails';

import filmImage from '../../assets/images/Bitmap.png';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  argTypes: {
    movieInfo: {
      control: 'object',
      description: 'Object that includes all information about film',
      defaultValue: {
        imageUrl: filmImage,
        name: 'Pulp Fiction',
        year: '2003',
        rating: '8.9',
        duration: '2h 34min',
        description:
          'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
        genreList: ['Action', 'Adventure']
      }
    }
  }
};

const Template = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
