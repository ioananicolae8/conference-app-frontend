import { emptyArray, emptyString } from 'utils/constants'

export const initialConferences = {
  name: emptyString,
  startDate: null,
  endDate: null,
  type: null,
  category: null,
  location: {
    name: emptyString,
    address: emptyString,
    country: null,
    county: null,
    city: null,
    latitude: emptyString,
    longitude: emptyString
  },
  speakers: emptyArray,
  deleteSpeakers: emptyArray
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
    case 'startDate':
    case 'endDate':
    case 'type':
    case 'category':
      return { ...state, [action.type]: action.payload }
    case 'locationName':
      return { ...state, location: { ...state.location, name: action.payload } }
    case 'address':
    case 'country':
    case 'county':
    case 'city':
    case 'latitude':
    case 'longitude':
      return { ...state, location: { ...state.location, [action.type]: action.payload } }

    case 'addSpeaker': {
      const minId = Math.min(...state.speakers.map(s => s.id), 0)
      return {
        ...state,
        speakers: [...state.speakers, { id: minId - 1, name: emptyString, nationality: emptyString, rating: emptyString }]
      }
    }

    case 'deleteSpeaker': {
      return {
        ...state,
        speakers: state.speakers.filter(s => s.id !== action.payload),
        deleteSpeakers: action.payload > 0 ? [...(state.deleteSpeakers || []), action.payload] : state.deleteSpeakers
      }
    }

    case 'speakerName':
      return {
        ...state,
        speakers: state.speakers.map(s => (s.id === action.payload.id ? { ...s, name: action.payload.name } : s))
      }
    case 'nationality':
    case 'rating':
    case 'isMainSpeaker':
      return {
        ...state,
        speakers: state.speakers.map(s => (s.id === action.payload.id ? { ...s, ...action.payload } : s))
      }
    case 'resetConference':
      return action.payload
    default:
      return state
  }
}
