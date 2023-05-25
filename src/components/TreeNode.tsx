import React from "react";

interface TreeNodeProps {
  node: {
    spanId: string;
    children: any[];
  };
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  if (!node) {
    return null;
  }

  return (
    <li>
      {node.spanId}
      {node.children.length > 0 && (
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
