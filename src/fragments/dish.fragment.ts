import { gql } from '@apollo/client';

export const DISH_FRAGMENT = gql`
  fragment DishFragment on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      choices {
        name
        extra
      }
      extra
    }
  }
`;
