import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import {
    Wrapper,
    MethodItem,
    Footer
} from '~/components/Auth'
import Button from '~/packages/sondn-button'
import TextInput from '~/packages/sondn-text-input'
import axios from 'axios'

const FORM_EMAIL_PASSWORD = 'FORM_EMAIL_PASSWORD'

const defaultFn = () => {}

function Login({
    onSwitchRegister = defaultFn,
    onLoginSuccess = defaultFn,
}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [forms, setForms] = useState([])
    const [errors, setErrors] = useState({})

    const pushForm = form => {
        setForms([...forms, form])
    }

    const getCurrentForm = () => {
        if (!forms.length) return null
        return forms[forms.length - 1]
    }

    const getFormTitle = () => {
        const currentForm = getCurrentForm()
        switch(currentForm) {
            case FORM_EMAIL_PASSWORD:
                return 'Log in'
            default:
                return 'Login to Tiktok'
        }
    }

    const handleBackForm = () => {
        const formsClone = forms.slice(0)
        formsClone.pop()
        setForms(formsClone)
    }

    const handleLogin = () => {
        axios.post('/api/auth/login', { email, password })
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                window.location.reload()
                onLoginSuccess()
            })
            .catch(err => {
                switch(err.response.status) {
                    case 422:
                        const resErrors = {}
                        Object.keys(err.response.data.errors).forEach(field => {
                            resErrors[field] = err.response.data.errors[field][0]
                        })
                        setErrors(resErrors)
                        break;
                    case 401:
                        setErrors({
                            ...errors,
                            password: 'Email or password is incorrect'
                        })
                        break;
                    default:
                        setErrors({
                            ...errors,
                            password: 'An error has occurred, please contact admin@gmail.com'
                        })
                }
            })
    }

    const currentForm = getCurrentForm()

    return (
        <Wrapper
            heading={getFormTitle()}
            showBackBtn={!!currentForm}
            onBack={handleBackForm}
            renderFooter={() => (
                <Footer
                    text="Don't have an account?"
                    actionTitle="Sign up"
                    onAction={onSwitchRegister}
                />
            )}
        >
            {currentForm === FORM_EMAIL_PASSWORD ? (
                <>
                    <TextInput
                        type="text"
                        label="Email"
                        placeholder="Email"
                        value={email}
                        autoFocus
                        message={errors.email}
                        onChange={e => {
                            setEmail(e.target.value)
                            setErrors({
                                ...errors,
                                email: null
                            })
                        }}
                    />
                    <TextInput
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={password}
                        message={errors.password}
                        onChange={e => {
                            setPassword(e.target.value)
                            setErrors({
                                ...errors,
                                password: null
                            })
                        }}
                    />
                    <Button
                        size="l"
                        disabled={!email || !password}
                        style={styles.loginBtn}
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                </>
            ) : (
                <>
                    <MethodItem
                        icon={<FontAwesomeIcon icon={faUser} />}
                        title="Use phone / email / username"
                        onClick={() => pushForm(FORM_EMAIL_PASSWORD)}
                    />
                    <MethodItem
                        icon={(
                            <FontAwesomeIcon
                                icon={faFacebook}
                                style={{ color: 'var(--facebook-color)' }}
                            />
                        )}
                        title="Log in with Facebook"
                        onClick={() => {}}
                    />
                    <MethodItem
                        icon={(
                            <FontAwesomeIcon
                                icon={faGoogle}
                                style={{ color: 'var(--google-color)' }}
                            />
                        )}
                        title="Log in with Google"
                        onClick={() => {}}
                    />
                </>
            )}
        </Wrapper>
    )
}

const styles = {
    loginBtn: {
        width: '100%',
        marginTop: 32,
    }
}

export default Login
