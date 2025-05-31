import React from 'react';
import testTemplate from '../../assets/testTemplate.docx';

function GenerateWord() {
  const downloadDocx = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = testTemplate;
    link.target = '_blank'; // Open the link in a new tab
    link.download = 'testTemplate.docx'; // Set the desired file name

    // Trigger a click event to start the download
    link.click();
  };

  return (
    <div>
      <button onClick={downloadDocx}>Download .docx</button>
    </div>
  );
}

export default GenerateWord;
