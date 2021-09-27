import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conference/components/ConferenceFilters'
import conferences from 'utils/mocks/attendeeList'; 
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text';
import MyConferenceList from './MyConferenceList';
import { generateDefaultFilters } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferenceHeader from './MyConferenceHeader';
import { AddButton } from '@bit/totalsoft_oss.react-mui.kit.core';
import { useHistory } from 'react-router';


function MyConferenceListContainer() {

const {data, loading} = {data: conferences, loading: false}
const [filters, setFilters] = useState(generateDefaultFilters())
const handleApplyFilters = useCallback(value => {
    setFilters(value)
}, []) 
const {t} = useTranslation()
const [, setHeader] = useHeader();
const history = useHistory();

const handleAddClick = useCallback(()=> {history.push("myConferences/new")}, [history])

useEffect(()=>{
    //did mount
    return ()=> {
        //will unmount
        setHeader(null)
    }
    // eslint-disable-line react-hooks/exhaustive-deps
},[]) 
useEffect (()=>{
    setHeader(<MyConferenceHeader 
        title={t('NavBar.MyConferences')}
        actions={<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={handleAddClick}/>} />)
}, 
[setHeader, t])


if(loading) return <LoadingFakeText lines={10}/>

    return (
         <>
    <ConferenceFilters filters = {filters} onApplyFilters = {handleApplyFilters}/>
    <MyConferenceList conferences ={data} />
    </>
    )
}
 
export default MyConferenceListContainer;
