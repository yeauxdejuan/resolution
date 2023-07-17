import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';


const Home = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  
  dayjs.extend(relativeTime);
  const handleChange = (e) => {
    // console.log(e.target.value)
    setText(e.target.value);
  }

  const handleClick = () => {
    console.log('void button clicked')
    async function fetchData() {
      await axios.post('/void', {
        text: text
      })
        .then((data) => {
          console.log('Success! handleClick post request data ==>', data);
          // empty input field
          setText("");
        })
        .catch((err) => {
          console.error('Error in handleClick axios.post request ===>', err)
      })
    }
    // calls async function
    fetchData()
    
  }

  useEffect(() => {
    // async function to get void table data
    async function fetchData() {
      await axios.get('/void')
        .then((response) => {
          // updates 'posts' state array with void table data
          setPosts(response.data)
        })
        .catch((err) => {
          console.error('Error in useEffect axios.get request ===>', err)
        })
    }
    // calls async function
    fetchData()
    // runs useEffect every time '/void' changes similar to componentDidMount()
  }, ['/void'])

  return (
    <div>
      <main>
        <div className="intro">
          <h1>Welcome to Resolution</h1>
          <p>
            This innovative app will change the way you resolve interpersonal
            conflict. Resolution offers multiple features for all of your
            conflict resolution needs. This app is a medium for you to express
            your emotions, communicate with others in a low pressure
            environment, and make decisions about how to move forward. Utilizing
            all that resolution has to offer will improve your relationships
            with others and your quality of life overall.
          </p>
        </div>
        <div className="scream-void-component">
          <div className="input-scream-container">
            <h2>Scream into the Void</h2>
            <p>
              Do you need to vent? Often, this might be the first constructive
              way to deal with your conflict. Put words to your emotions, say
              your piece and get everything off your chest. All screams are
              anonymous.
            </p>
            <input
              name="scream"
              type="text"
              placeholder="Go Ahead and Vent"
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' ? handleClick() : null}
              value={text}
            ></input>
            <button onClick={handleClick}>SUBMIT</button>
          </div>
          <div className="scream-container">
            {<pre>{text}</pre>}
            {posts.map((post) => {
              return (
                <p className="scream"
                  key={post.id+"void"}>
                  <span>Anonymous: </span>
                  { `"${post.text}"` }
                  <span> created: { dayjs(`${post.createdAt}`).fromNow() }</span>
                </p>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
