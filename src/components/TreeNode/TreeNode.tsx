import React, { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import "./TreeNode.scss";
import { assignNumbersToDates, getHighestDuration } from "../../utils/utils";
import { data } from "../../data/dataset";

interface TreeNodeProps {
  node: {
    id: number;
    startTime: string;
    operationName: string;
    spanId: string;
    duration: number;
    children: any[];
    attrs: any;
  };
  handleExpand?: () => void;
  expanded?: boolean;
}

const dates = data.map((d) => d.startTime);
const numbers = assignNumbersToDates(dates);

console.log(numbers);

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [expanded, setexpanded] = useState(true);

  const nodeIndex = numbers.sortedDates.findIndex(
    (date) => date == node.startTime
  );

  const highestDuration = getHighestDuration(data);
  const startTime = numbers.numbers[nodeIndex];

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
          <TimelineDetails
            expanded={expanded}
            handleExpand={handleExpand}
            node={node}
          />
          <TimeLineSpan node={node} />
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

const TimelineDetails: React.FC<TreeNodeProps> = ({
  node,
  handleExpand,
  expanded,
}) => {
  const http = node.attrs["aspecto.calc.class"];
  const db = node.attrs["db.system"];
  const messaging = node.attrs["messaging.system"];

  // console.log(httpName.toUpperCase());
  return (
    <div
      className="timeline-details"
      style={{
        flexBasis: 300 - node.id * 20,
      }}
    >
      {node.children.length > 0 && (
        <span className="timeline-icon" onClick={handleExpand}>
          {expanded ? <GoChevronDown /> : <GoChevronRight />}
        </span>
      )}

      <span>{node.attrs["service.name"]}</span>
      <span>{(http === "http" && "HTTP") || db || messaging}</span>
    </div>
  );
};

const TimeLineSpan: React.FC<TreeNodeProps> = ({ node }) => {
  const nodeIndex = numbers.sortedDates.findIndex(
    (date) => date == node.startTime
  );

  const highestDuration = getHighestDuration(data);
  const startTime = numbers.numbers[nodeIndex];
  return (
    <div className="timeline-span-container">
      <div
        className="timeline-span"
        style={{
          marginLeft: `${
            (startTime * 100) / Math.ceil(highestDuration / 1000000)
          }%`,
          width: `${(node.duration * 100) / highestDuration}%`,
        }}
      ></div>
    </div>
  );
};
