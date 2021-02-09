import React from "react";

const TableList = ({ post, index, DeletePost, editPost }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>
        {post.thumbnail ? (
          <img
            src={`http://localhost:5000/uploads/${post.thumbnail}`}
            alt={post.title}
            className="img-fluid"
            style={{
              width: "150px",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src="https://lh3.googleusercontent.com/proxy/LHfqgYt_7_GweCuRagUQTScqgrCz39maxMUrLFUdpqFCU-_7EHvP5NyGSi-q6CmnWP7IZTtslwi0kaYeO7Jr4UCqb4OtEm22wNKPBa_DcZ6grcMWrUPirVa6g_Uk_QfnJA"
            alt={post.title}
            className="img-fluid"
            style={{
              width: "150px",
              objectFit: "cover",
            }}
          />
        )}
      </td>
      <td>
        <a
          href={`http://localhost:5000/uploads/${post.epubFile}`}
          target="_blank"
        >
          {post.epubFile}
        </a>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => DeletePost(post.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableList;
