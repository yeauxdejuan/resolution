import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Void = ({ posts }) => {
  dayjs.extend(relativeTime);

  const [voidLikes, setVoidLikes] = useState([]); // [ { id: 1, likes: 0},  { id: 2, likes: 4}]

  // USE EFFECT TO GET VOID ON COMPONENT MOUNT
  const getVoid = async () => {
    const request = await axios.get("/void");
    setVoidLikes(
      request.data.map((scream) => {
        return { id: scream.id, likes: scream.likes };
      })
    );
  };

  useEffect(() => {
    getVoid();
  }, []);

  // INCREMENTS LIKES STATE
  const handleIncrementLikes = (post) => {

    // UPDATE A SPECIFIC SCREAM VIA POST ID
    const fetchData = async () => {
      // filters voidLikes state array and adds 1 to likes value
      const incrementCurrPostLikes =
        voidLikes.filter((obj) => obj.id === post.id)[0].likes + 1;
      await axios
        .put(`/void/${post.id}`, { likes: incrementCurrPostLikes })
        .then((response) => {
          console.log("PUT request response", response);
        })
        .catch((err) => {
          console.error("ERROR in axios put request at handleLikeClick: ", err);
        });
    };
    fetchData();
  };

  return (
    <div className="scream-container bg-primary container ps-3 pt-3 pb-2">
      {posts.map((post) => {
        return (
          <div key={post.id + "void"} id={post.id}>
            {console.log("voidLikes =>", voidLikes)}
            {console.log(
              "if conditional for post.id =>",
              voidLikes.filter((obj) => obj.id === post.id)[0].likes
            )}
            <p className="scream modal-content  text-white pt-3">
              <span className="scream modal-content  text-sm-left">
                anonymous:{" "}
              </span>
              <b>{`"${post.text}"`}</b>
              <span> created: {dayjs(`${post.createdAt}`).fromNow()}</span>
            </p>
            <button
              className="btn btn-light round-btn"
              onClick={() => handleIncrementLikes(post)}
            >
              💯{" "}
              <span className="likes">
                {voidLikes.filter((obj) => obj.id === post.id)[0].likes}
              </span>
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default Void;
