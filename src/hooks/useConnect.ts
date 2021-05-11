import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { MainState } from '../redux/reducers'

const useConnect: TypedUseSelectorHook<MainState> = useSelector

export default useConnect