import React from "react";
import {
  VscJson,
  VscFile,
  VscFileBinary,
  VscFolder,
  VscFileCode,
  VscFileMedia,
  VscFilePdf,
  VscFileZip,
} from "react-icons/vsc"; // vscode-like icons


import {
  FaJs,
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaMarkdown,
  FaGitAlt
} from "react-icons/fa";

const extensionMap = {
  js: <FaJs color="#f7df1e" />,
  jsx: <FaReact color="#61dafb" />,
  ts: <VscFileCode color="#2f74c0" />,
  tsx: <FaReact color="#61dafb" />,

  html: <FaHtml5 color="#e34c26" />,
  css: <FaCss3Alt color="#264de4" />,
  json: <VscJson color="#cb6a00" />,
  md: <FaMarkdown />,

  png: <VscFileMedia />,
  jpg: <VscFileMedia />,
  jpeg: <VscFileMedia />,
  gif: <VscFileMedia />,
  svg: <VscFileMedia />,

  zip: <VscFileZip />,
  rar: <VscFileZip />,

  pdf: <VscFilePdf />,

  gitignore: <FaGitAlt />,
};

function getExtension(name = "") {
  if (!name) return "";

  // handle files like `.gitignore`
  if (name.startsWith(".") && !name.slice(1).includes(".")) {
    return name.slice(1).toLowerCase();
  }

  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function FileIcons({ extension, size = 18 }) {
  if (!extension) return <VscFile size={size} />;

//   const ext = extension.toLowerCase();

    
  const ext = getExtension(extension);

  return (
    <span style={{ fontSize: size }}>
      {extensionMap[ext] || <VscFileBinary />} {/* fallback */}
    </span>
  );
}

export default FileIcons;
