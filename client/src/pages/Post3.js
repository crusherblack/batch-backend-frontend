import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import TableList from "../components/TableList";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    epubFile: null,
  });

  const onChange = (e) => {
    const updateForm = { ...form };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(updateForm);
  };

  const { title, description, thumbnail, epubFile } = form;

  const getPosts = async () => {
    try {
      setLoading(true);
      const posts = await API.get("/posts");
      setLoading(false);
      setPosts(posts.data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();

      body.append("title", title);
      body.append("description", description);
      body.append("thumbnail", thumbnail);
      body.append("epubFile", epubFile);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoadingAction(true);

      const post = await API.post("/post-with-multer", body, config);

      setLoadingAction(false);

      const postResponse = post.data.data.post;

      setPosts([...posts, postResponse]);

      setForm({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const DeletePost = async (id) => {
    await API.delete(`/post/${id}`);

    const filteredPost = posts.filter((post) => post.id != id);

    setPosts(filteredPost);
  };

  return (
    <div className="container mt-3">
      <div className="card ">
        <div className="card-header bg-white">
          <h2 className="text-center text-primary">Post</h2>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => submitPost(e)}>
            <div className="form-group">
              <label>Please Input Your Post</label>
              <input
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
              />
              <small>Input your post</small>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                onChange={(e) => onChange(e)}
                className="form-control"
                value={description}
              ></textarea>
              <small>Post Description</small>
            </div>
            <div className="form-group">
              <label>Please Input Your Thumbnail</label>
              <input
                name="thumbnail"
                onChange={(e) => onChange(e)}
                type="file"
                className="form-control"
              />
              <small>Input your Thumbnail</small>
            </div>
            <div className="form-group">
              <label>Please Input Your Epub File</label>
              <input
                name="epubFile"
                onChange={(e) => onChange(e)}
                type="file"
                className="form-control"
              />
              <small>Input your Epub File</small>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                {loadingAction ? "Submitting" : "Submit Todo"}
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer bg-white">
          <h2 className="mb-3">List Posts</h2>
          <table className="table table-compact table-striped table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            {loading ? (
              <h3>Loading Dulu guys</h3>
            ) : (
              <tbody>
                {posts.map((post, index) => (
                  <TableList
                    key={post.id}
                    post={post}
                    index={index}
                    DeletePost={DeletePost}
                  />
                ))}
              </tbody>
            )}
          </table>
          <br />
          <div>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
