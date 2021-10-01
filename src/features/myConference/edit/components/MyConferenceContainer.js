import React, { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from '../../list/components/MyConferenceHeader';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import { categories, counties, countries, types, cities } from '../../../../utils/mocks/conferenceDictionaries';
import MyConference from './MyConference';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { reducer} from '../conferencesState'
import { initialConferences } from '../conferencesState';
import { useRouteMatch } from 'react-router';
import { conference as mockConference } from 'utils/mocks/myConference'
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { CONFERENCE_QUERY } from 'features/myConference/queries/conferenceQuery'
 
const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConferences)
    const match = useRouteMatch()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'
    const [id, setId] = useState(8)
 
    const { loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY,
        {
            variables: {
                id: conferenceId
            },
            skip: isNew,
            onCompleted: (result) =>dispatch({type:'resetConference', payload: result.conference})
        }
    )
 
    // useEffect(() => {
    //     if (!isNew) {
    //         dispatch({ type: 'resetConference', payload: mockConference })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setHeader(null), [])
 
    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
    }, [conference.name, setHeader, t])
 
    const { loading, data } = {
        loading: false,
        data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }
 
    if ( loading || loadingConference) {
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
 
export default MyConferenceContainer;