import { useState } from 'react';

const CodebenderIntro = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [resultText, setResultText] = useState("");
  const [resultImageUrl, setResultImageUrl] = useState("");

  const getData = async (input = prompt) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/openai?prompt=${input}`);
      const data = await response.json();
      const aiResponse = data.text;
      const imageUrl = data.imageUrl;

      setResultText(aiResponse);
      setResultImageUrl(imageUrl);
      setLoading(false);
      setError("");
    } catch (e) {
      console.log(resultText);
      setError("Oops")
    }
  };

  const updatePrompt = (event) => {
    event.preventDefault();
    setPrompt(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    getData(prompt).then();
  };

  const renderResponse = () => {
    return (
      <div className="response">
        {error && <p>{error}</p>}
        {/* {resultText && <p>{resultText}</p>} */}
        {resultImageUrl && (
        <div>
          <img src={resultImageUrl} alt = "Generated Thumbnail" />
          </div>
          )}
      </div>
    )
  }

  return (
    <>
      <form className="mainForm" onSubmit={submitForm}>
        <input name="input-field" placeholder="Enter the title or description of your video" onChange={updatePrompt} value={prompt}/>
        <button type="submit" className="mainButton">
            {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-light fa-location-arrow" />}
        </button>
      </form>    
      {renderResponse()}
    </>
  );
}

export default CodebenderIntro;