import React, { useEffect, useState } from 'react';
import Post from './Post';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import Card from './Card';

const Feed = ({ username, pending, setPending }) => {
  const name = username;
  console.log(username);
  const [posts, setPosts] = useState([]);
  // const [length,setLength]=useState(null);
  const [reload, setReload] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  };
  useEffect(() => {
    fetch(`https://banaosocialmedia.herokuapp.com/postes?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        // setLength(data.length)
      });
  }, [name, reload, username, pending]);
  if (loading) {
    return <p>loading...</p>;
  }
  console.log(posts);
  return (
    <>
      <div className="container">
        <h2 className='text-center mb-2 text-dark fw-bolder'>You All Posts Are Here</h2>
        {/* <Post/> */}
        {posts?.map((one) => (
          <Card
            post={one}
            pending={pending}
            setPending={setPending}
            reloading={reloading}
            setReloading={setReloading}
            reload={reload}
            setReload={setReload}
            loading={loading}
            setLoading={setLoading}
            key={one._id}
          ></Card>
        ))}
      </div>
    </>
  );
};

export default Feed;
