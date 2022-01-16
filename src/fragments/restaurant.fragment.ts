import { gql } from '@apollo/client';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImg
    category {
      slug
      name
    }
    address
    isPromoted
  }
`;
