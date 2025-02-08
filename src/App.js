import React, { useState } from "react";
import "./styles.css";
import { FaArrowDown } from "react-icons/fa";

// Import Penguin images
import penguinImage from "./pingu.png";
import sadPenguinImage from "./sad_pingu.png"; // New image for sad penguin

export default function App() {
  const [showPenguin, setShowPenguin] = useState(false);
  const [isSad, setIsSad] = useState(false); // Track if penguin is sad
  const [message, setMessage] = useState(
    "This is a test. You will need to answer one question in order to pass it. Are you ready?"
  ); // Initial message
  const [noButtonClicks, setNoButtonClicks] = useState(0); // Track number of No button clicks
  const [testStarted, setTestStarted] = useState(false); // Track if test has started
  const [valentineAsked, setValentineAsked] = useState(false); // Track if Valentine question is asked
  const [valentineAnswered, setValentineAnswered] = useState(false); // Track if Valentine question is answered

  // Scroll function for when you click the arrow
  const handleScrollDown = () => {
    setShowPenguin(true); // Ensure penguin and message show up
    document
      .getElementById("penguin-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Handle clicks for the No button in the first question
  const handleNoButtonClick = () => {
    setIsSad(true); // Make penguin sad
    setMessage(
      "Are you sure you want to make Pingu sad?? Are you ready now to take the test?"
    ); // Update message
    setNoButtonClicks(noButtonClicks + 1); // Increment the No button click counter
  };

  // Handle clicks for the Yes button in the first question
  const handleYesButtonClick = () => {
    setIsSad(false); // Keep penguin happy
    setMessage("Pingu is happy!"); // Update message
    setTestStarted(true); // Mark test as started
  };

  // After Begin Test is clicked
  const handleBeginTestClick = () => {
    setValentineAsked(true); // Now ask the Valentine question
    handleScrollDown(); // Scroll down again
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
    setValentineAnswered(true); // Hide Yes/No buttons after answering
  };

  // Calculate the scale factor for the Yes button based on the number of No clicks
  const yesButtonScale = 1 + noButtonClicks * 0.1; // Each No click increases the scale by 0.1

  return (
    <div className="main-container">
      {/* Background container with overlay */}
      <div className="background-container">
        <div className="background-overlay"></div>
      </div>

      {/* First Section - Hello Bambi */}
      <div className="first-section">
        <h1 className="greeting">Hello Bambi</h1>
        <div className="arrow-container" onClick={handleScrollDown}>
          <FaArrowDown className="down-arrow" />
        </div>
      </div>

      {/* Second Section - Penguin & Message */}
      <div
        id="penguin-section"
        className={`penguin-section ${showPenguin ? "fade-in" : ""}`}
      >
        {showPenguin && (
          <div className="penguin-container">
            {/* Speech Bubble */}
            <div className="speech-bubble">
              <div className="pingu-text">Pingu:</div>
              <p>{message}</p>

              {/* Buttons */}
              {!testStarted && !valentineAsked && (
                <div className="button-container">
                  <button
                    className="response-button yes-button"
                    style={{ transform: `scale(${yesButtonScale})` }} // Apply scaling to Yes button
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

              {/* Show Begin Test button after Yes button is clicked */}
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

              {/* Valentine Question */}
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

            {/* Penguin Image */}
            <img
              src={isSad ? sadPenguinImage : penguinImage}
              alt="Penguin"
              className={`penguin ${isSad ? "sad" : ""}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
