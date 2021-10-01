import React, { useCallback, useState } from 'react'
import { Typography, Grid, InputAdornment } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { emptyString } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'

function Welcome() {
  const { t } = useTranslation()

  const [email, setEmail] = useEmail()

  const [isValid, setIsValid] = useState(true)

  const [inputValue, setInputValue] = useState(email)
  const handleTextFieldValueChange = useCallback(event => setInputValue(event.target.value), [])
  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(inputValue) ? inputValue : emptyString
    setEmail(isEmailValid ? inputValue : emptyString)
    setIsValid(isEmailValid)
  }, [setEmail, inputValue])

  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )

  return (
    <Grid container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={12}>
        <Typography variant='h5'>{t('LandingPage.Title')}</Typography>
      </Grid>
      <Grid item container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <CustomTextField
            debounceBy={0}
            value={inputValue}
            onChange={handleTextFieldValueChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton size='small' color='theme' aria-label='go' onClick={handleButtonClick}>
                  <KeyboardReturnIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
            onKeyDown={handleKeyDown}
            helperText={!isValid && t('LandingPage.BadEmail')}
            error={!isValid}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
