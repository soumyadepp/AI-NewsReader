import { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';

const alanKey = '6d15836cdd5c7ede44490ff2453920652e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          console.log(articles);
          setNewsArticles(articles);
          return;
        }
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <div className="heading-news">
          <h1>News application</h1>
        </div>
        <div className="news">
          {newsArticles.length == 0 && (
            <div className="app-default">
              <div className="news-wrapper">
                <h2>Ask Alan for the news you want!</h2>
                <h3>He will read it out for you!</h3>
              </div>
              <div className="try-saying">
                <ul className="try-saying list">
                  <li>Try saying Hello Alan!</li>
                  <li>Try saying Hello! What is this app about?</li>
                  <li>Try saying any keyword about which you want to search news</li>
                </ul>
              </div>
            </div>
          )}
          <div className="row">
            {
              newsArticles.map((newsArticle) => {
                if (newsArticle.urlToImage)
                  return (
                    <div className="article-card">
                      <img className="news-image" src={newsArticle.urlToImage} />
                      <h2 className="news-header">{newsArticle.title}</h2>
                      {newsArticle.author && <span className="news-author">{newsArticle.author}</span>}
                      <p className="news-description">{newsArticle.description}</p>
                    </div>
                  )
              })
            }
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
