import shadows from "@mui/material/styles/shadows";
import Avatar from "@mui/material/Avatar";

export default function PostComposer() {
  const divStyle = {
    width: 600,
    color: "#fff",
    boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div style={divStyle}>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px 10px 10px 10px",
          padding: "10px 10px 10px 10px",
          gap: "30px",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 48, height: 48 }}
        />

        <div
          style={{
            width: 500,
            display: "inline-block",
            color: "#F0EBE3",
            borderColor: "#F0EBE3",
            borderStyle: "solid",
            borderRadius: "50px",
          }}
        ></div>
      </header>
      <h1 style={{ color: "black" }}>Post Composer</h1>
    </div>
  );
}

function PostEditor() {
  return (
    <div>
      <h1>Post Editor</h1>
    </div>
  );
}
