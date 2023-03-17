import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setCORS } from "google-translate-api-browser";
import speakOut from "~/utils/speak";
import langs from "google-translate-api-browser/dist/languages";

const translate = setCORS("https://corsanywhere.herokuapp.com/");

type Transcription = {
  sender: string;
  message: string;
  senderId: string;
  isFinal: boolean;
};

interface Props {
  transcriptionQueue: Transcription[];
  setTranscriptionQueue: Dispatch<SetStateAction<Transcription[]>>;
  languageCode: string;
}

const Captions: React.FC<Props> = ({
  transcriptionQueue,
  setTranscriptionQueue,
  languageCode,
}) => {
  const [caption, setCaption] = useState<{ sender: string; message: string }>();

  useEffect(() => {
    async function translateText() {
      console.info("transcriptionQueue", transcriptionQueue);
      if (transcriptionQueue.length > 0) {
        const res = await translate(transcriptionQueue[0]?.message as string, {
          // @ts-ignore
          to: languageCode,
        });
        setCaption({
          message: res.text,
          sender: transcriptionQueue[0]?.sender as string,
        });
        console.log("------------------\n", res.text, "\n------------------");
        setTranscriptionQueue((prev) => [...prev.slice(1)]);
      }
    }
    translateText();
  }, [transcriptionQueue]);

  return (
    <div className="closed-captions-wrapper">
      <div className="closed-captions-container">
        {caption?.message ? (
          <>
            <div className="closed-captions-username">{caption.sender}</div>
            <span>:&nbsp;</span>
          </>
        ) : null}
        <div className="closed-captions-text">{caption?.message}</div>
      </div>
    </div>
  );
};

export default Captions;
