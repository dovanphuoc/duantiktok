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

function Register({
    onSwitchLogin = defaultFn,
    onRegisterSuccess = defaultFn,
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
                return 'Sign up'
            default:
                return 'Sign up for Tiktok'
        }
    }

    const handleBackForm = () => {
        const formsClone = forms.slice(0)
        formsClone.pop()
        setForms(formsClone)
    }

    const handleRegister = () => {
        axios.post('/api/auth/register', { email, password })
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                onRegisterSuccess()
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
                    text="Already have an account?"
                    actionTitle="Log in"
                    onAction={onSwitchLogin}
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
                        onClick={handleRegister}
                    >
                        Sign up
                    </Button>
                </>
            ) : (
                <>
                    <MethodItem
                        icon={<FontAwesomeIcon icon={faUser} />}
                        title="Use phone or email"
                        onClick={() => pushForm(FORM_EMAIL_PASSWORD)}
                    />
                    <MethodItem
                        icon={(
                            <FontAwesomeIcon
                                icon={faFacebook}
                                style={{ color: 'var(--facebook-color)' }}
                            />
                        )}
                        title="Sign up with Facebook"
                        onClick={() => {}}
                    />
                    <MethodItem
                        icon={(
                            <FontAwesomeIcon
                                icon={faGoogle}
                                style={{ color: 'var(--google-color)' }}
                            />
                        )}
                        title="Sign up with Google"
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

export default Register
