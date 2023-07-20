import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai"

function Chatbot() {
  const [content, setContent] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openai = new OpenAIApi(new Configuration ({
    apiKey: "removed key"
  }))

  useEffect(() => {
    if (submitted) {
      const prompt = `
      This is the description of my upcoming social media post: ${postDescription}.
      Can you suggest some catchy captions?
      Note: Please start your response with "Here are some potential captions for your post:" 
      Then immediately start listing the captions in the format of 1. 2. 3. 
      Please never deviate from this format.
      `;

      openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are an expert social media manager." },
            { role: "user", content: prompt }
          ]
      }).then(res => {
          setContent(""); // Clearing the content to give a typing effect
          typeWriterEffect(res.data.choices[0].message.content);
          setSubmitted(false);
      })
    }
  }, [submitted]); 

  const typeWriterEffect = (text) => {
    let index = 0;
    let temp = '';
    const interval = setInterval(() => {
      if (index < text.length) {
        temp += text.charAt(index);
        setContent(temp);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // The speed of typing, you can adjust this value
  }

  const handleSubmit = () => {
    setSubmitted(true);
  }

  return (
    <div id='captionGenerator' className='section_parent'>
        <div className='heading'>Caption Generator</div>
        <div>
          <input 
            placeholder="Enter your post description"
            value={postDescription}
            onChange={e => setPostDescription(e.target.value)}
          />
          <button onClick={handleSubmit}>Generate Captions</button>
        </div>
        <pre>{content}</pre> {/* Here we are using 'pre' tag to preserve formatting */}
    </div>
  );
}

export default Chatbot;
