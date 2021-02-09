import React, { useState } from "react";
import { API } from "../config/api";
import TableList from "../components/TableList";

import { useQuery, useMutation } from "react-query";

const Post = () => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const { isLoading, error, data: postsData, isFetching, refetch } = useQuery(
    "getPosts",
    async () => await API.get("/posts")
  );

  const submitPostMutation = useMutation(async () => {
    try {
      const body = JSON.stringify({
        title,
        description,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/post", body, config);

      setForm({
        title: "",
        description: "",
      });

      refetch();
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const deletePostMutation = useMutation(async (payload) => {
    const response = await API.delete(`/post/${payload.id}`);
    refetch();
    return response;
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { id, title, description } = form;

  const submitPost = async (e) => {
    e.preventDefault();
    submitPostMutation.mutate();
  };

  const DeletePost = async (id) => {
    deletePostMutation.mutate({
      id,
    });
  };

  const editPost = (id) => {
    setIsEdit(true);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        title,
        description,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoadingAction(true);

      const postResponse = await API.patch(`/post/${id}`, body, config);

      setLoadingAction(false);

      const updatedPost = postResponse.data.data.post;

      //   setPosts(updatedPosts);

      setForm({
        id: null,
        title: "",
        description: "",
      });

      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="card ">
        <div className="card-header bg-white">
          <h2 className="text-center text-primary">Post</h2>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => (isEdit ? updatePost(e) : submitPost(e))}>
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
              <button className="btn btn-primary btn-block" type="submit">
                {loadingAction
                  ? "Submitting"
                  : isEdit
                  ? "Update Post"
                  : "Submit Todo"}
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

            {isLoading ? (
              <h3>Loading Dulu guys</h3>
            ) : (
              <tbody>
                {postsData.data.data.posts.map((post, index) => (
                  <TableList
                    key={post.id}
                    post={post}
                    index={index}
                    DeletePost={DeletePost}
                    editPost={editPost}
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
