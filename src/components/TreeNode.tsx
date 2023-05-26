import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import "./TreeNode.scss";

interface TreeNodeProps {
  node: {
    id: number;
    operationName: string;
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
    <>
      <div className="timeline-container">
        <div className="timeline-element" style={{ marginLeft: node.id * 20 }}>
          <div
            className="timeline-details"
            style={{ flexBasis: 300 - node.id * 20 }}
          >
            {node.children.length > 0 && (
              <span onClick={handleExpand}>
                <GoChevronDown />
              </span>
            )}
            {node.operationName}
          </div>
          <div className="timeline-span"></div>
        </div>
      </div>
      {expanded &&
        node.children.length > 0 &&
        node.children.map((child) => (
          <TreeNode key={child.spanId} node={child} />
        ))}
    </>
  );
};

export default TreeNode;
