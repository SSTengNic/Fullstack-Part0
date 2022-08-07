import { connect } from 'react-redux'
import {setfilter} from '../reducers/filterReducer'


const Filter = (props) => {

    const handlefilter = (event) => {
    props.setfilter(event.target.value)
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

const mapDispatchToProps = {
  setfilter,
}

export default connect(null, mapDispatchToProps)(Filter)