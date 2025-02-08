import React, { useState } from "react";
import "./styles.css";
import { FaArrowDown } from "react-icons/fa";
import penguinImage from "./pingu.png";
import sadPenguinImage from "./sad_pingu.png";
import Fireworks from "@fireworks-js/react";

export default function App() {
  const [showPenguin, setShowPenguin] = useState(false);
  const [isSad, setIsSad] = useState(false);
  const [message, setMessage] = useState(
    "This is a test. You will need to answer one question in order to pass it. Are you ready?"
  );
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [valentineAsked, setValentineAsked] = useState(false);
  const [valentineAnswered, setValentineAnswered] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleScrollDown = () => {
    setShowPenguin(true);
    document
      .getElementById("penguin-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleNoButtonClick = () => {
    setIsSad(true);
    setMessage(
      "Are you sure you want to make Pingu sad?? Are you ready now to take the test?"
    );
    setNoButtonClicks(noButtonClicks + 1);
  };

  const handleYesButtonClick = () => {
    setIsSad(false);
    setMessage("Pingu is happy!");
    setTestStarted(true);
  };

  const handleBeginTestClick = () => {
    setValentineAsked(true);
    handleScrollDown();
    setMessage("Do you want to be my Valentine?");
  };

  const handleValentineNoClick = () => {
    setIsSad(true);
    setMessage(
      "Oh no, Pingu is sad again! You got another chance. Do you want to be my valentine?"
    );
  };

  const handleValentineYesClick = () => {
    setIsSad(false);
    setMessage("Pingu is so happy! Thank you for being my Valentine!");
    setValentineAnswered(true);
    setShowFireworks(true); // Trigger fireworks on "Yes"
  };

  const yesButtonScale = 1 + noButtonClicks * 0.1;

  return (
    <div className="main-container">
      <div className="background-container">
        <div className="background-overlay"></div>
      </div>

      <div className="first-section">
        <h1 className="greeting">Hello Bambi</h1>
        <div className="arrow-container" onClick={handleScrollDown}>
          <p className="arrow-down-text down-arrow">Press here</p>
          <FaArrowDown className="down-arrow" />
        </div>
      </div>

      <div
        id="penguin-section"
        className={`penguin-section ${showPenguin ? "fade-in" : ""}`}
      >
        {showPenguin && (
          <div className="penguin-container">
            <div className="speech-bubble">
              <div className="pingu-text">Pingu:</div>
              <p>{message}</p>

              {!testStarted && !valentineAsked && (
                <div className="button-container">
                  <button
                    className="response-button yes-button"
                    style={{ transform: `scale(${yesButtonScale})` }}
                    onClick={handleYesButtonClick}
                  >
                    Yes
                  </button>
                  <button
                    className="response-button no-button"
                    onClick={handleNoButtonClick}
                  >
                    No
                  </button>
                </div>
              )}

              {testStarted && !valentineAsked && (
                <div className="beggin-text-button-container">
                  <button
                    className="response-button begin-test-button"
                    onClick={handleBeginTestClick}
                  >
                    <p className="begin-test-button">Begin Test</p>
                  </button>
                </div>
              )}

              {valentineAsked && !valentineAnswered && (
                <div className="button-container">
                  <button
                    className="response-button yes-button"
                    onClick={handleValentineYesClick}
                  >
                    Yes
                  </button>
                  <button
                    className="response-button no-button"
                    onClick={handleValentineNoClick}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
            {showFireworks && <Fireworks className="fireworks-container" />}

            <img
              src={isSad ? sadPenguinImage : penguinImage}
              alt="Penguin"
              className={`penguin ${isSad ? "sad" : ""}`}
            />
          </div>
        )}
      </div>

      <footer className="footer">
        Made with love for Andreiuta by Adilica
      </footer>
    </div>
  );
}
