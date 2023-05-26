import React, { useState } from "react";

interface TreeNodeProps {
  node: {
    spanId: string;
    children: any[];
  };
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [expanded, setexpanded] = useState(true);
  if (!node) {
    return null;
  }

  const handleExpand = () => {
    setexpanded(!expanded);
  };

  return (
    <li>
      <button onClick={handleExpand}>\/</button>
      {node.spanId}

      {expanded && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.spanId} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
