import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const commands = [
    {
      command: [
        "convert primary color to * color",
        "change colour to *",
        "change colour to the *",
      ],
      callback: (cmdText) => setCommandText(capitalizeFirstLetter(cmdText)),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [commandText, setCommandText] = useState("");
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log("commandText =>", capitalizeFirstLetter(commandText));
  const color = [
    "Red",
    "Darkred",
    "Blue",
    "Lightblue",
    "Darkblue",
    "Orange",
    "Lightorange",
    "Darkorange",
    "Green",
    "Lightgreen",
    "Darkgreen",
    "Yellow",
    "Lightyellow",
    "Darkyellow",
    "Pink",
    "Lightpink",
  ];

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let paragraph = "";

  if (commandText) {
    let modifiedCmd = commandText.split(" ").join("");
    console.log("comd => ", modifiedCmd);
    if (color.includes(modifiedCmd)) {
      paragraph = (
        <p style={{ color: modifiedCmd }}>
          Colour is Changed to the : {modifiedCmd}
        </p>
      );
    } else {
      paragraph = <p>Could not find color: {modifiedCmd}</p>;
    }
  }
  return (
    <div className="App">
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2>Change color from your voice Command</h2>
        {paragraph}

        <p id="transcript">Transcript: {transcript}</p>

        <button onClick={SpeechRecognition.startListening}>
          <span>
            <i class="fa fa-microphone" aria-hidden="true"></i>
            <span>...</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
