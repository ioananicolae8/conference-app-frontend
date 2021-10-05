import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import React from 'react'
import PropTypes from 'prop-types'
import MyConferenceSubtitle from './MyConferenceSubtitle'
import MyConferenceContent from './MyConferenceContent'
import { useTranslation } from 'react-i18next'

const MyConferenceItem = props => {
  const {t} = useTranslation()
  const noStatusSet = t('MyConferences.StatusNotSet')
  const noStatusSetObject = { name: noStatusSet}
  const { conference } = props
  const { name, location, speakers } = conference
  const speaker = speakers.find(item => item.isMainSpeaker) || noStatusSetObject

  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<MyConferenceSubtitle speaker={speaker} location={location} />}
      content={<MyConferenceContent conference={conference} />}
    />
  )
}
MyConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired
}
export default MyConferenceItem
