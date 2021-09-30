import React from 'react' 
import  PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { PermIdentity , Room} from '@material-ui/icons'

const ConferenceSubtitle=(props) => {
    const {speaker, location} = props
    const {t} = useTranslation()

return(
    <Grid container item lg={12}>
        <Grid item xs={1}>
            <PermIdentity/>
        </Grid>
        <Grid item lg={11}>
                <Typography variant="caption">{t('Conferences.Speaker')}</Typography>
                <Typography variant="caption">{speaker?.name}</Typography>
            </Grid>
        <Grid item lg={1}>
              <Room/>
        </Grid>
        <Grid item lg={11}>
            <Typography variant="caption">{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
        </Grid>
    </Grid>
    )

}

ConferenceSubtitle.propTypes = {
    speaker: PropTypes.object,
    location: PropTypes.object.isRequired
}

export default ConferenceSubtitle;