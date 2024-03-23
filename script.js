document.addEventListener('DOMContentLoaded', () => {
    const newsList = document.getElementById('newsList');
    const speakButton = document.getElementById('speakButton');

    // Fetch headlines from News API
    const fetchNewsHeadlines = async () => {
        try {
            const apiKey = '0d9804e9a30d4237a74c4c56977bab67';
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=0d9804e9a30d4237a74c4c56977bab67&apiKey=${apiKey}`);
            const data = await response.json();
            return data.articles.map(article => article.title);
        } catch (error) {
            console.error('Error fetching news headlines:', error);
            return [];
        }
    };

    // Function to speak text using Speech Synthesis API
    const speakText = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    // Function to start speech recognition
    const startRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.trim().toLowerCase();
            if (command.includes('read headlines')) {
                speakButton.click();
            }
        };

        recognition.start();
    };

    // Event listener for Speak Button
    speakButton.addEventListener('click', async () => {
        speakButton.disabled = true;
        speakButton.innerText = 'Reading...';

        const headlines = await fetchNewsHeadlines();
        headlines.forEach(headline => {
            const listItem = document.createElement('li');
            listItem.textContent = headline;
            newsList.appendChild(listItem);
            speakText(headline);
        });

        speakButton.disabled = false;
        speakButton.innerText = 'Read Headlines';
    });

    // Start speech recognition when the page loads
    startRecognition();
});
