import React from "react";
import TreeNode from "../TreeNode/TreeNode";
import "./Tree.scss";

interface TreeProps {
  tree: any;
}

const axisPoint = [0, 100, 200, 300, 400, 500];

const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <div className="tree-container">
      {tree.map((node: any) => (
        <TreeNode key={node.spanId} node={node} />
      ))}
      <div className="axis">
        {axisPoint.map((p) => (
          <>
            <div
              style={{ left: `${(p * 100) / Math.ceil(554)}%` }}
              className="axis-point"
            >
              {p}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Tree;
