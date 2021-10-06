/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'

const TimerConference = props => {
  const properties = props
  const conferenceList = properties?.location?.state?.conferenceList
  const conferenceId = properties?.location?.pathname?.split('/').pop()
  const conference = conferenceList.find(c => c.id === conferenceId)
  const { t } = useTranslation()

  const history = useHistory()
  const handleLeave = () => {
    history.push('/myConferenceList')
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4'>{conference.name}</Typography>
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
        <Grid item xs={12}>
          <Button onClick={handleLeave} right color='danger' size='sm'>
            {t('Conferences.Leave')}
          </Button>
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
