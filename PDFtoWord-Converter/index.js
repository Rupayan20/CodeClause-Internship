import React, { useState } from "react";
import jsPDF from "jspdf";
import { useHistory } from "react-router-dom";

const PDFToDocument = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [document, setDocument] = useState(null);

  const history = useHistory();

  const convertPdfToDocument = async () => {
    if (!pdfFile) {
      return;
    }

    const pdf = new jsPDF();
    pdf.addHTML(pdfFile);
    pdf.save("document.pdf");

    setDocument("document.pdf");
  };

  const handleUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleDownload = () => {
    if (!document) {
      return;
    }

    const link = document.createElement("a");
    link.href = document;
    link.download = "document.pdf";
    link.click();
  };

  return (
    <div>
      <h1>PDF to Document Converter</h1>
      <form onSubmit={convertPdfToDocument}>
        <input type="file" name="pdf_file" id="pdf_file" onChange={handleUpload} />
        <input type="submit" value="Convert" />
      </form>
      {document && (
        <a href={document} download={document}>Download Document</a>
      )}
    </div>
  );
};

export default PDFToDocument;
