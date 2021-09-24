import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConferenceHeader from 'features/myConference/list/MyConferenceHeader';
import { useHeader } from 'providers/AreasProvider';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { categories, cities, counties, countries, types } from 'utils/mocks/conferenceDictionaries';
import MyConference from './MyConference';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText';

const MyConferenceContainer = () => {
const {t} = useTranslation();
const [, setHeader] = useHeader()

useEffect(()=>()=>setHeader(null), [])
useEffect(()=>{setHeader(<MyConferenceHeader actions={<SaveButton title={t('General.Buttons.Save')}/>}/>)}, [setHeader,t])

const {data, loading} = {loading:false, data: {
    typeList: types,
    categoryList: categories,
    countryList: countries,
    countyList: counties, 
    cityList: cities
}}

if (loading) {
    return <LoadingFakeText lines={10} />
}

return <MyConference
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />

}

export default MyConferenceContainer;