import { useCallback } from "react"
import { useApolloLocalStorage } from "./apolloLocalStorage"
import { emailKey } from "apollo/cacheKeyFunctions"

export const useEmail = () => {
    const [storageEmail, setStorageEmail] = useApolloLocalStorage(emailKey)
    const email = storageEmail.email
    const setEmail = useCallback((value)=>setStorageEmail({email:value}), [setStorageEmail])
    return [email,setEmail]
}