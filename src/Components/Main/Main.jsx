import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

export default function Main() {

    const { prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        setInput,
        setResult,
        setLoading,
        input,
        SetShowResult
    } = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today</p>
                        </div>
                        <div className="cards">

                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Briefly summarize this conept : urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Brainstorm team bonding activites for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Improve the readability of the folllowing code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>

                        </div>
                    </> :

                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="" />
                            {
                                loading ?
                                    <div className="loader">
                                        <hr className='jr'/>
                                        <hr className='jr'/>
                                        <hr className='jr'/>
                                    </div>:
                                    <p dangerouslySetInnerHTML={{ __html: result }} />
                            }
                            
                            

                        </div>
                    </div>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter the prompt here' onChange={(e) => setInput(e.target.value)} value={input} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" onClick={() => { onSent() }} />
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>

                </div>

            </div>
        </div >
    )
}
