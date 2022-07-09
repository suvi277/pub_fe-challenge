import React, { useEffect, useState } from "react";
import "./App.css";

import axios from 'axios';
import RecursiveAccordion from "./components/RecursiveAccordion/RecursiveAccordion";

const App = () => {
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);

    async function getContent() {
      const [ sections, questions1, questions2 ] =  await axios.all([
        axios.get(`/api/sections.json`), 
        axios.get(`/api/directors-officers-management/qa.json`), 
        axios.get(`/api/company-dealings/qa.json`), 
      ]);

      setSections(sections.data);
      setQuestions([...questions1.data, ...questions2.data]);
    }

  useEffect(() => {
    getContent();
  }, []);

  const createTreeStructure = (items, rootId, link) => {
		return items.filter((item) => item[link] === rootId).map((item) => {
			const children = createTreeStructure(items, item.id, 'parentId').map((childNode) => {
				const queries = questions?.filter((ques) => ques.sectionId === childNode.id);
				return { ...childNode, queries };
			});

			return { ...item, children };
		});
	}

  const chapters = createTreeStructure(sections, -1, 'id');

   return (
    <div className="container">
      {chapters.length === 0 ? (
        <div>Loading....</div>
      ) : (
        chapters.map(item => (
           <RecursiveAccordion key={item.id} {...item} />
        ))
      )}
    </div>
  );
}

export default App;