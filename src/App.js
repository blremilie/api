import React, { useState } from 'react';

export default function App() {
    const [tabUrl, setUrl] = useState([]);
    const shortenedUrl = async (baseUrl) => {
        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "url="+baseUrl
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const baseUrl = formData.get('url');
        
        if (!baseUrl) {
            const errorParagraph = document.getElementById("error");
            const urlInput = document.getElementById("url");
            applyErrorStyle(urlInput, errorParagraph);
            return; 
        }

        const shortenedData = await shortenedUrl(baseUrl);
        if (shortenedData && shortenedData.result_url) {
            const newItem = { 'baseUrl': baseUrl, 'shorten': shortenedData.result_url };
            setUrl([...tabUrl, newItem]);
        } else {
            console.log("Failed to shorten URL");
        }
    }

    function copyText(index) {
        const textToCopy = tabUrl[index].shorten;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard');
            });
        const button = document.getElementById(`copy-button-${index}`);
        button.innerText = 'Copied!';
    }

    function applyErrorStyle(urlInput, errorParagraph) {
        urlInput.style.borderColor = "hsl(0, 87%, 67%)";
        urlInput.style.color = "hsl(0, 87%, 67%)";
        urlInput.placeholder = "Shorten a link here...";
        urlInput.classList.add("red-placeholder");
        errorParagraph.style.visibility = "visible";
    }
    
    return (
        <div id="list">
            <form id="form" method="POST" onSubmit={handleSubmit}>
                <input type="text" id="url" name="url" 
                placeholder="Shorten a link here..."/>
                <button type="submit" id="submit_button">Shorten URL</button>
                <p id="error" style={{ visibility: 'hidden' }}
                >Please add a link</p>
            </form>
            <ul id="ul-react">
                {tabUrl.map((item, index) => (
                    <li id="li-react" key={index}>
                        <p id="item-baseUrl">{item.baseUrl}</p>
                        <p id="item-shorten">{item.shorten}</p>
                        <button type="button" id={`copy-button-${index}`} 
                        className='copy-button'
                        onClick={() => copyText(index)}>Copy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}