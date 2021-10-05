import { gql } from '@apollo/client';

export const WITHDRAW_CONFERENCE = gql`
mutation withdraw($input: Attendee!) {
    withdraw(input: $input)
},
`