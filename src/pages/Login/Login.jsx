/*global chrome*/
import React, { useEffect, useState } from 'react';
import API from '../../services/API';
const LoginPage = (props) => {
    const [state, setState] = useState({
        values: {
        },
    })

    const submitForm = (event) => {
        event.preventDefault();
        try {
            API.post('user/login',
                {
                    email: state.values.email,
                    password: state.values.password
                }
            ).then(response => {
                if (response.data.response_code === 1000) {
                    chrome.storage.local.set({
                        "email": state.values.email,
                        "token": response.data.data.token,
                        "name": response.data.data.first_name,
                        "paid": response.data.data.paid,
                        "account_status": response.data.data.status
                    }, function () {
                        props.changeAuthPage(0);
                    })
                } else if (response.data.response_code === 1001) {
                    chrome.storage.local.set({
                        "email": state.values.email,
                        "token": response.data.data.token,
                        "name": response.data.data.first_name,
                        "paid": response.data.data.paid,
                        "account_status": response.data.data.status
                    }, function () {
                        props.changeAuthPage(4);
                    });
                }
                else if (response.data.response_code === 1002) {
                    chrome.storage.local.set({
                        "email": state.values.email,
                        "token": response.data.data.token,
                        "name": response.data.data.first_name,
                        "paid": response.data.data.paid,
                    }, function () {
                        props.changeAuthPage(3, { "email": state.values.email,"name":response.data.data.first_name });
                    });
                }
                else {
                    setState(state => ({ ...state, errorMessage: response.data.message }))
                }
            })
        } catch (error) {
            setState(state => ({ ...state, errorMessage: "An error logging in, please try again" }))
        }
    }
    const onChange = (field, event) => {
        let fieldValue = event.target.value
        setState(state => ({
            ...state,
            values: {
                ...state.values,
                [field]: fieldValue
            }
        }))
    }
    // useEffect(() => {
    //     chrome.storage.local.get(["token"], function (items) {
    //         // NOTE: check syntax here, about accessing 'authToken'
    //         var authToken = items.token
    //         if (authToken !== null || authToken!==undefined) {
    //             try {
    //                 API.get('user/checkToken',
    //                     {
    //                         "headers": {
    //                             token: authToken
    //                         }
    //                     }
    //                 ).then(response => {
    //                     if (response.data.response_code === 1000) {
    //                         //
    //                     } else if (response.data.response_code === 2000) {
    //                         props.changeAuthPage(1)
    //                         //setState(state => ({ ...state, errorMessage: response.data.message }))
    //                     }
    //                 })
    //             } catch (error) {
    //                 //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
    //             }
    //         }
    //     });
    // }, [])
    const changePage = (pageNumber) => {
        props.changeAuthPage(pageNumber);
    }
    return (
        <div>
            <div>
                <div >
                    <div className="login-image-style">
                        <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="login-image-center" height="80" />
                    </div>
                    <div>
                        <p className="login-title">METAGUARD</p>
                    </div>
                    <div>
                        <p className="login-welcome">Welcome Back!</p>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <div className="input-form">
                        <label className="input-label">Email</label>
                        <input className="input-box" type="text" value={state.values.email} onChange={(e) => onChange('email', e)} placeholder="Type your email" />
                    </div>
                    <div className="input-form">
                        <label className="input-label">Password</label>
                        <input className="input-box" type="password" value={state.values.password} onChange={(e) => onChange('password', e)} placeholder="Type your password" />
                    </div>
                    <a className="login-forgot-password" onClick={() => changePage(6)}><p>Reset password here</p></a>
                    <p className="error-message">{state.errorMessage}</p>
                    <div id="login-divider">
                        <button type="submit" className="login-button" ><span>Login</span></button>
                    </div>
                </form>
                <div className="login-bottom-label">
                    <p>Don't have an account? <a className="login-a-label" onClick={() => changePage(2)}>Sign up here</a></p>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;