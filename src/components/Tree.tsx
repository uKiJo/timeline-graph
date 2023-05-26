import React from "react";
import TreeNode from "./TreeNode";
import "./Tree.scss";

interface TreeProps {
  tree: any;
}

const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <div className="tree-container">
      {tree.map((node: any) => (
        <TreeNode key={node.spanId} node={node} />
      ))}
    </div>
  );
};

export default Tree;
