import {useContext} from 'react';
import {AppContext} from './ContextProvider';

const useAppContext = () => useContext(AppContext);

export default useAppContext;
