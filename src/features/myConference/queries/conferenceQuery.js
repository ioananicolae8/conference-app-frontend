import { gql } from '@apollo/client';
import ConferenceFragments from 'features/conference/gql/queries/fragments';
import CommonFragments from 'features/common/fragments';


export const CONFERENCE_QUERY= gql`
query conferenceById($id: ID!) {
  conference(id: $id) {
   ...conference
    location {
      ...location
      country {
        ...country
      }
      county {
       ...county
      }
      city {
        ...city
      }
    
    }
    type {
     ...type
    }
    category {
      ...category
    }
    speakers {
      ...speaker
    }
  }
}
${ConferenceFragments.conference}
${ConferenceFragments.location}
${ConferenceFragments.speaker}
${CommonFragments.county}
${CommonFragments.country}
${CommonFragments.city}
${CommonFragments.type}
${CommonFragments.category}

`
