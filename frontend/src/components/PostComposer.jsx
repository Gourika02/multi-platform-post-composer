import React, { useState } from "react";
import "./PostComposer.css";

function PostComposer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const platforms = [
    {
      name: "Instagram",
      logo: "📸",
    },
    {
      name: "Facebook",
      logo: "🔵",
    },
    {
      name: "Twitter / X",
      logo: "🐦",
    },
    {
      name: "LinkedIn",
      logo: "💼",
    },
    {
      name: "YouTube",
      logo: "▶️",
    },
  ];

  const selectPlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const submitPost = async () => {
    try {
      const response = await fetch(
        "https://multi-platform-post-composer.onrender.com/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            platforms: selectedPlatforms,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Post Published Successfully!");

        setTitle("");
        setContent("");
        setSelectedPlatforms([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Failed to connect to backend");
    }
  };

  return (
    <div className="composer">
      <h1>✨ Create New Post</h1>

      <p className="subtitle">
        Create and publish your content across multiple platforms
      </p>

      <label>📝 Post Title</label>

      <input
        type="text"
        placeholder="Enter your post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>✍️ Write Your Post</label>

      <textarea
        placeholder="Write your amazing content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <p className="count">Characters: {content.length}</p>

      <h2>🌐 Select Social Media Platforms</h2>

      <div className="platform-container">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className={
              selectedPlatforms.includes(platform.name)
                ? "platform selected"
                : "platform"
            }
            onClick={() => selectPlatform(platform.name)}
          >
            <span className="logo">{platform.logo}</span>

            <span>{platform.name}</span>
          </div>
        ))}
      </div>

      <button onClick={submitPost}>🚀 Publish Post</button>
    </div>
  );
}

export default PostComposer;