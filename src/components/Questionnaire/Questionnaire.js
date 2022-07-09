
import React, { useState } from "react";
import "./Questionnaire.css";
import SanitizedHtml from "../SanitizedHtml/SanitizedHtml";

const Questionnaire = ({qaId, tocId, question, answer}) => {
    const [isExpanded, toggleExpanded] = useState(false);

    return (
        <div id={tocId} className="space-left">
            <div 
                className={isExpanded ? "accordion-header expanded no-border" :"accordion-header"} 
                onClick={() => toggleExpanded(!isExpanded)}
            >
                <span className="space-right">
                    <span>{qaId}. &nbsp;</span>
                    <SanitizedHtml html={question} />
                </span>  
            </div>
            {isExpanded && 
                <div className="answer-content">
                    <SanitizedHtml html={answer} />
                </div>
            }
        </div>
    )
}

export default Questionnaire;