
import React, { useState } from "react";
import Questionnaire from "../Questionnaire/Questionnaire";
import "./RecursiveAccordion.css";

const RecursiveAccordion = ({title, children, queries }) => {
    const [isExpanded, toggleExpanded] = useState(true);

    return (
        <div className="space-left">
            <h3 className={isExpanded ? "accordion-header expanded" :"accordion-header"} onClick={() => toggleExpanded(!isExpanded)}>   
                <span className="space-right">{title}</span>
            </h3>
            {
                isExpanded && queries?.map(query => (
                   <Questionnaire key={query.qa_id} qaId={query.qa_id} tocId={query.tocId} question={query.question} answer={query.answer}/>
                ))
            }
            {
                isExpanded && children?.map((item) => (
                    <RecursiveAccordion key={item.title} {...item} />
                ))
            }
        </div>
    )
}

export default RecursiveAccordion;