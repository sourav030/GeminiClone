import { createContext, useState } from "react";
import run from "../config/gemini"
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, SetShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");
    const delayPara=(index,nextword)=>{
            setTimeout(function(){
                setResult(prev=>prev+nextword)
            },75*index)
    }

    const newChat=()=>{
        
        SetShowResult(false)
        setLoading(true)
    }
    const onSent = async (prompt) => {
        setResult("");
        
        SetShowResult(true);
        let response;
        if(prompt!==undefined){
                response=await run(prompt);
                setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
        // setRecentPrompt(input)
        // setPrevPrompt(prev=>[...prev,input])
        // const response = await run(input);
        let responseArray=response.split("**");
        
        let newResponse=" ";
        for(let i=0; i<responseArray.length; i++)
        {
            if(i==0 || i%2!==1)
            {
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+ responseArray[i]+"</b>"
            }
        }
        let newResponse2=newResponse.split("*").join("</br>")
        let newResponseArray=newResponse2.split(" ")
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+"")
        }
        setResult(newResponse);
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompt,
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
        SetShowResult,
        run,
        newChat

    }
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;