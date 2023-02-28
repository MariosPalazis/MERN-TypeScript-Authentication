import { createContext, useContext } from "react"


export type GlobalUserContent = {
    token?: string,
    username?:string
}
export type GlobalUser= {
    user: GlobalUserContent,
    setUser:(c: GlobalUserContent) => void

}
export const MyGlobalUserContext = createContext<GlobalUser>({
    user: {
        username: '',
        token: ''
    }, // set a default value
    setUser: () => {},
})
  
export const useGlobalContext = () => useContext(MyGlobalUserContext)