import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from '../../list/components/MyConferenceHeader'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConference from './MyConference'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { reducer } from '../conferencesState'
import { initialConferences } from '../conferencesState'
import { useRouteMatch } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from 'features/myConference/queries/ConferenceQuery'
// import { DICTIONARY_QUERY } from 'features/conference/gql/queries/DictionaryQuery';
import { useMutation } from '@apollo/client'
import { UPDATE_CONFERENCE } from 'features/myConference/queries/mutations/UpdateConference'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router-dom'
import { useError } from 'hooks/errorHandling'
import { useCallback } from 'react'
import { useEmail } from 'hooks/useEmail'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [email]=useEmail()
  const [conference, dispatch] = useReducer(reducer, initialConferences)
  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  const addToast = useToast()
  const history = useHistory()
  const showError = useError()

  // const [id, setId] = useState(8)

  const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
    variables: {
      id: conferenceId,
      isNew
    },

    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  // useEffect(() => {
  //     if (!isNew) {
  //         dispatch({ type: 'resetConference', payload: mockConference })
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setHeader(null), [])

  const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: result => {
      addToast(t('MyConferences.SavingSucceeded'), 'success')

      if (isNew) {
        history.push(`/myConferences/${result?.saveConference?.id}`)
        return
      }
      result?.saveConference && dispatch({ type: 'resetConference', payload: result?.saveConference })
    },
    onError: showError
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deleteSpeakers, type, category, location, speakers } = conference
    const { city, county, country, ...locationData } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      organizerEmail: email,
      deleteSpeakers,
      type,
      category,
      location: {
        ...locationData,
        cityId: city?.id,
        countyId: county?.id,
        countryId: country?.id
      },
      speakers
    }
    updateConference({ variables: { input } })
  }, [conference, email, updateConference])

  

  useEffect(() => {
    setHeader(
      <MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} onClick={handleSave} />} />
    )
  }, [conference.name, handleSave, setHeader, t])

  // const { loading, data } = useQueryWithErrorHandling (DICTIONARY_QUERY)

  if (loadingConference || saving) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
