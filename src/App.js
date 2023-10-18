import "./App.css";
import { useEffect, useRef, useState } from "react";
import recipe from "./recipe.jpeg";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function App() {
  const canvas = useRef();

  const [recipient, setRecipient] = useState("");
  const [perscription, setPerscription] = useState("");
  const [isSet, setIsSet] = useState(false);

  function writeText(text, locX, locY) {
    const ctx = canvas.current.getContext("2d");
    ctx.font = "50px serif";
    var lineheight = 50;
    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++)
      ctx.fillText(lines[i], locX, locY + i * lineheight);

    setIsSet(true);
  }

  async function shareCanvas() {
    const dataUrl = canvas.current.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
      new File([blob], "animation.png", {
        type: blob.type,
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  }

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    const image = new Image();
    image.src = recipe;
    image.onload = () => {
      context.drawImage(image, 0, 0, 1200, 851);
    };
  }, []);

  return (
    <div className="App">
      <div className="formContainer">
        <FloatingLabel controlId="floatingTextarea2" label="Empfänger">
          <Form.Control
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Leave a comment here"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Verschreibung">
          <Form.Control
            as="textarea"
            value={perscription}
            onChange={(e) => setPerscription(e.target.value)}
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <Button
          variant="primary"
          onClick={() => {
            writeText(recipient, 100, 210);
            writeText(perscription, 100, 500);
          }}
        >
          Text einfügen
        </Button>
        <canvas ref={canvas} width={1200} height={851} />
        <Button variant="secondary" hidden={!isSet} onClick={shareCanvas}>
          Share
        </Button>
      </div>
    </div>
  );
}

export default App;
