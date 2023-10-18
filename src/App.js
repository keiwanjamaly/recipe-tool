import './App.css';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import downloadjs from "downloadjs";

async function createPdf() {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()
  downloadjs(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
}

function App() {
  return (
    <div className="App">
      Hello
      <button onClick={createPdf}>Create PDF</button>
    </div>
  );
}

export default App;
