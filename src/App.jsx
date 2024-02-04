/* eslint-disable no-unused-vars */
import { useState } from "react";
import explorer from "./data/folderData";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorer, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  return (
    <>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </>
  );
}

export default App;
