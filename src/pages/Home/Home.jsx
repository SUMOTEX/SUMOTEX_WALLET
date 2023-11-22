/*global chrome*/
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import API from '../../services/API';

const HomePage = (props) => {

    const [state, setState] = useState({
        url: ""
    })
    chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (changes.visitedURL.newValue !== undefined) {
            setState(state => ({ ...state, code: changes.visitedURL.newValue.url_type, message: changes.visitedURL.newValue.url_message, url: changes.visitedURL.newValue.pageUrl }))
        }
    })
    useEffect(() => {

        chrome.storage.local.get(['name'], function (items) {
            setState(state => ({ ...state, username: items.name }))
        })
        chrome.storage.local.get(["paid"], function (items) {
            setState(state => ({ ...state, paid: items.paid }))
        })
        chrome.storage.local.get(["email"], function (items) {
            setState(state => ({ ...state, email: items.email }))
        })
    }, [])


    const selectLogOut = () => {
        chrome.storage.local.get(['token'], function (items) {
            chrome.storage.local.set({ "token": null }, function () {
                props.changeAuthPage(1);
            })
        })

        // chrome.storage.local.clear(function () {

        //     // do something more

        // });

    }

    const onVerifyWebsite = () => {
        try {
            API.post('enquiry/verifyRequest', {
                domain_name: state.url
            }
            ).then(response => {
                if (response.data.response_code === 1000) {
                    props.changeAuthPage(5)
                } else if (response.data.response_code === 2000) {
                    setState(state => ({ ...state, errorMessage: "Seems like your there's an error, please try again later" }))
                }
            })
        } catch (error) {
            //setState(state => ({ ...state, errorMessage: "Seems like your token have expired, please retry" }))
        }
    }

    return (
        <div>
            <div className="top-row">
                <div className="home-logo-style" onClick={() => window.open('www.metaguard.app', '_blank')}>
                    <img src={"https://imgur.com/OghXkTf.png"} alt="logo" className="" height="30" />
                    <p className="home-title">Metaguard.app</p>
                </div>
                <div>
                    <button className="logout-button" onClick={() => selectLogOut()}><span>Logout</span></button>
                </div>
            </div>
            <div className="home-account-detail">
                <h4>{state.username}'s Account</h4>
                {state.paid == 1 ? <div className="tickbox-paid-container">
                    PAID
                </div> : <div className="tickbox-unpaid-container">
                    UNPAID
                </div>}
            </div>
            {state.code === 1000 ?
                <div className="home-center-align">
                    <div className="tickbox-container">
                        <span>&#10003;</span>
                    </div>
                    <div className="verified-container">Verified</div>
                    <p className="home-content"><u>{state.url}</u> <br /><br />has been verified by the MetaGuard Team.</p>
                    <h3>This website is safe to use.</h3>
                </div> : state.code === 1002 ?
                    <div className="home-center-align">
                        <div className="x-container"><span>&#215;</span></div>
                        <div className="unverified-container">Unverified</div>
                        <p className="home-content"><u>{state.url}</u> <br /><br /> has not been verified with us, send us their website then we will verify and keep your crypto journey secure.</p>
                        <button className="home-verify-button" onClick={() => onVerifyWebsite()}>Submit this website to us</button>
                    </div> :
                    <div className="home-center-align">
                        <p>If you are seeing this message, please refresh the page..</p>
                    </div>}
            <p className="bottom-label">To close/open the plugin, for Macbook(Option +S), on Window is (Alt +S)</p>
        </div >
    )
};

export default HomePage;