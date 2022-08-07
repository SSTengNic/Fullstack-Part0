import { useDispatch, useSelector } from 'react-redux'
import {setfilter} from '../reducers/filterReducer'


const Filter = () => {

    const dispatch = useDispatch()

    const handlefilter = (event) => {
        dispatch(setfilter(event.target.value))
    }

    return (
      <div>
        filter
          <input
           onChange={handlefilter}
           />
      </div>
    )
}

export default Filter