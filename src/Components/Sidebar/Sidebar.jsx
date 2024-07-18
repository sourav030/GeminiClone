import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from "../../assets/assets"
import { Context } from '../../context/context'
export default function Sidebar() {
    const [extendend, setextend] = useState(false)
    const { onSent, prevPrompt, setRecentPrompt,newChat } = useContext(Context)
    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img src={assets.menu_icon} alt="" className='menu' onClick={() => setextend(prev => !prev)} />
                <div className='new-chat'onClick={newChat}>
                    <img src={assets.plus_icon} alt="" />
                    {extendend ? <p>New Chat</p> : null}
                </div>
                {extendend ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    {
                        prevPrompt.map((item, index) => {
                            return (
                                <div className="recent-entry" onClick={()=>loadPrompt(item)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{item}</p>
                            </div>
                           )
                        })
                    }
                   
                </div> : null
                }

            </div>

            <div className="bottom">
                <div className="botto-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extendend ? <p>Help</p> : null}
                </div>

                <div className="botto-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extendend ? <p>Activity</p> : null}
                </div>

                <div className="botto-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extendend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}
