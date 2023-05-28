import React from "react";
import TreeNode from "../TreeNode/TreeNode";
import "./Tree.scss";
import { getHighestDuration } from "../../utils/utils";
import { data } from "../../data/dataset";

interface TreeProps {
  tree: any;
}

const axisPoint = [0, 100, 200, 300, 400, 500];
const highestDuration = getHighestDuration(data);
console.log(highestDuration);

const Tree: React.FC<TreeProps> = ({ tree }) => {
  // const [containerHeight, setContainerHeight] = useState(second);

  return (
    <div className="tree-container">
      <div className="axis">
        {axisPoint.map((p) => (
          <>
            <div
              style={{
                left: `${(p * 100) / Math.ceil(highestDuration / 10e5) - 0.4}%`,
              }}
              className="axis-point"
            >
              {p}ms
            </div>
            <div
              style={{
                left: `${(p * 100) / Math.ceil(highestDuration / 10e5)}%`,
              }}
              className="axis-line"
            ></div>
          </>
        ))}
      </div>
      {tree.map((node: any) => (
        <TreeNode key={node.spanId} node={node} />
      ))}
    </div>
  );
};

export default Tree;
