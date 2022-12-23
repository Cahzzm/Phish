import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'

const Demo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()

        const email = 'demo@aa.io';
        const password = 'password'

        dispatch(sessionActions.login( email, password ))

        history.push("/")

    }

    return (
        <button id='demo-login-button' onClick={handleClick} type='submit'>Demo Login</button>
    )
}

export default Demo;
