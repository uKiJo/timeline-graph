import React from "react";
import TreeNode from "./TreeNode";

interface TreeProps {
  tree: any;
}

const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <ul>
      {tree.map((node: any) => (
        <TreeNode key={node.spanId} node={node} />
      ))}
    </ul>
  );
};

export default Tree;
