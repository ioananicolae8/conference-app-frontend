import { gql } from '@apollo/client'
export const JOINED_ATTENDEES = gql`
  query joinedAttendees($id: ID!) {
    joinedAttendees(id: $id) {
      conferenceId
      attendeeEmail
    }
  }
`
export default JOINED_ATTENDEES
