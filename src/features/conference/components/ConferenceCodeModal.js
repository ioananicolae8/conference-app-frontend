import React from 'react'
import qrCode from 'assets/img/qrCode.png'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const ConferenceCodeModal = ({ code }) => {
  const { t } = useTranslation()

  return (
    <Grid container justify={'center'}>
      <Grid item>
        <img src={qrCode} alt='QR' />
      </Grid>
      <Grid item>
        <Typography>{t('Conferences.QRCodeMessage', { code })}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.string.isRequired
}

export default ConferenceCodeModal
