import { gql, useQuery } from '@apollo/client';
import { getCurrentUser } from '../__generated__/getCurrentUser';

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      sucess
      error
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const useUser = () => {
  return useQuery<getCurrentUser>(GET_CURRENT_USER);
};
