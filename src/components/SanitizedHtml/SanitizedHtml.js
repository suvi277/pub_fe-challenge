import React from "react";
import DOMPurify from "dompurify";

const sanitize = (dirty, options) => ({
  __html: DOMPurify.sanitize(
    dirty, 
    { ...options }
  )
});

const SanitizedHtml = ({ html, options }) => (
  <span dangerouslySetInnerHTML={sanitize(html, options)} />
);

export default SanitizedHtml;