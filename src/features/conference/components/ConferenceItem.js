import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import React from 'react'
import PropTypes from 'prop-types'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'

const ConferenceItem = props => {
  const { conference, onAttend , onWithDraw, onJoin} = props
  const { name, location, speakers } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)

  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<ConferenceSubtitle speaker={speaker} location={location} />}
      content={<ConferenceContent conference={conference} onAttend={onAttend} onWithDraw={onWithDraw} onJoin={onJoin}/>}
    />
  )
}
ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onAttend: PropTypes.func.isRequired,
  onWithDraw: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired
}
export default ConferenceItem
