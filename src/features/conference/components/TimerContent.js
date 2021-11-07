/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, List, ListItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import ReactStars from 'react-rating-stars-component'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import CancelButton from '@bit/totalsoft_oss.react-mui.cancel-button'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import JOINED_ATTENDEES from 'features/conference/gql/queries/JoinedAttendees'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'

const TimerConference = props => {
  const properties = props
  const conferenceList = properties?.location?.state?.conferenceList
  const conferenceId = properties?.location?.pathname?.split('/').pop()
  const conference = conferenceList.find(c => c.id === conferenceId)
  const { t } = useTranslation()

  const [rating, setRating] = useState(0)
  const ratingChanged = newRating => {
    setRating(newRating)
  }

  console.log(rating)

  const history = useHistory()
  const handleLeave = useCallback(() => {
    history.push('/conferenceList')
  }, [history])

  const [, setHeader] = useHeader()

  useEffect(() => {
    return () => {
      setHeader(null)
    }
  }, [setHeader])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={conference.name}
        actions={<CancelButton key='addButton' title={t('Conferences.Leave')} onClick={handleLeave} />}
      />
    )
  }, [conference.name, handleLeave, setHeader])

  const { data, loading } = useQueryWithErrorHandling(JOINED_ATTENDEES, {
    variables: { id: conferenceId }
  })

  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <Grid container>
        <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
          <Typography variant='h5'>{t('Conferences.Rating')}</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
          <ReactStars count={5} onChange={ratingChanged} size={34} activeColor='#ffd700' />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>
            {t('Conferences.NameSpeaker')}: {conference.speakers.map(s => s.name).join(', ')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>
            {t('Conferences.Location')}: {conference.location.city.name}, {conference.location.country.name}
          </Typography>
        </Grid>
        <Grid>
          <List>
          {data.joinedAttendees.map(user => (
            <ListItem key={data.joinedAttendees.indexOf(user)}>
            <Typography variant={'subtitle2'}>
              {user.attendeeEmail}
            </Typography>
            </ListItem>
          ))}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

TimerConference.propTypes = {
  conference: PropTypes.object.isRequired
}

export default TimerConference

// import { useQuery } from '@apollo/client'
// import React from 'react'
// import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'

// function TimerContent() {
//   const { loading, data } = useQuery()
//   if (loading) {
//     return <LoadingFakeText lines={10} />
//   }
//   return data?.myFirstEndpoint
// }
// export default TimerContent
