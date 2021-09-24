import React from 'react'
import { useTranslation } from 'react-i18next'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import { Grid } from '@material-ui/core'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import  PropTypes  from 'prop-types'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'


const MyConferenceInfo = props => {
    const {types, categories} = props
    const {t} = useTranslation()
    return (<Grid container spacing={3}>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.StartDate')}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.EndDate')}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Type')}
                    createdLabel='Conference.Type'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={types}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Category')}
                    createdLabel='Conference.Category'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={categories}
                />
            </Grid>
        </Grid>
    </Grid >
         )
}

MyConferenceInfo.propTypes = {
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

export default MyConferenceInfo