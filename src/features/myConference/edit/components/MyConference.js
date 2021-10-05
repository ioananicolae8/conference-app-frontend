import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import { Info, LocationOn, Face } from '@material-ui/icons'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferenceInfo from './MyConferenceInfo'
import MyConferenceLocation from './MyConferenceLocation'
import MyConferenceSpeakers from './MyConferenceSpeakers'
import { useCallback } from 'react'

const MyConference = props => {
  const { types, categories, countries, counties, cities, conference, dispatch } = props
  const { location, speakers } = conference
  const { t } = useTranslation()
  const handleAddSpeaker = useCallback(() => dispatch({ type: 'addSpeaker' }), [dispatch])

  return (
    <>
      <IconCard
        icon={Info}
        title={t('Conference.Info')}
        content={<MyConferenceInfo types={types} categories={categories} conference={conference} dispatch={dispatch} />}
      />
      <IconCard
        icon={LocationOn}
        title={t('Conference.Location')}
        content={<MyConferenceLocation location={location} dispatch={dispatch} countries={countries} counties={counties} cities={cities} />}
      />
      <IconCard
        icon={Face}
        title={
          <CardTitle
            title={t('Conference.Speakers')}
            actions={[<AddButton key='addSpeaker' title={t('General.Buttons.AddSpeakers')} onClick={handleAddSpeaker} />]}
          />
        }
        content={<MyConferenceSpeakers speakers={speakers} dispatch={dispatch} />}
      />
    </>
  )
}

MyConference.propTypes = {
  types: PropTypes.array,
  categories: PropTypes.array,
  countries: PropTypes.array,
  counties: PropTypes.array,
  cities: PropTypes.array,
  conference: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MyConference
