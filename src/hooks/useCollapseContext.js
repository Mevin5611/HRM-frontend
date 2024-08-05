import {CollapseContext} from '../context/CollapseContext'
import {useContext} from 'react'


export const useCollapseContext = ()=>{
    const context = useContext(CollapseContext)

    if(!context){
        throw Error('useCollapseContext must be used inside  an CollapseContextProvider')
}
    return context
}
