import React, { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import * as Tooltip from "@radix-ui/react-tooltip";
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

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [expanded, setexpanded] = useState(true);

  const nodeIndex = numbers.sortedDates.findIndex(
    (date) => date == node.startTime
  );

  const startTime = numbers.numbers[nodeIndex];

  if (!node) {
    return null;
  }

  const handleExpand = () => {
    setexpanded(!expanded);
  };

  return (
    <>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="timeline-container">
              <div
                className="timeline-element"
                style={{ marginLeft: node.id * 20 }}
              >
                <TimelineDetails
                  expanded={expanded}
                  handleExpand={handleExpand}
                  node={node}
                />
                <TimeLineSpan node={node} />
              </div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              From {startTime}.00ms to{" "}
              {Math.ceil(startTime + node.duration / 10e5)}.00ms | Duration:{" "}
              {Math.floor(node.duration / 10e5)}.00ms
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
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
  const hostName = node.attrs["host.name"];
  const routeName = node.attrs["http.route"];
  const pathName = node.attrs["http.path"];
  const method = node.attrs["http.method"];

  const color =
    node.attrs["service.name"] === "orders-service"
      ? "#ff951f"
      : node.attrs["service.name"] === "authentication-service"
      ? "#cc7600"
      : "#ce92d8";

  const svgArray = [
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <path d="M7.49977 4.0669C10.4914 4.0669 12.9165 3.1565 12.9165 2.03345C12.9165 0.910407 10.4914 0 7.49977 0C4.50817 0 2.08301 0.910407 2.08301 2.03345C2.08301 3.1565 4.50817 4.0669 7.49977 4.0669Z M2.08301 5.61708V2.90039C2.08301 2.90039 2.0998 4.91705 7.49977 4.91705C12.8999 4.91705 12.9165 2.90039 12.9165 2.90039V5.65048C12.9165 5.65048 12.8829 7.80021 7.48316 7.80021C2.08301 7.80021 2.08301 5.61708 2.08301 5.61708Z M2.08301 9.26729V6.55078C2.08301 6.55078 2.0998 8.56726 7.49977 8.56726C12.8999 8.56726 12.9165 6.55078 12.9165 6.55078V9.30069C12.9165 9.30069 12.8829 11.4508 7.48316 11.4508C2.08301 11.4508 2.08301 9.26729 2.08301 9.26729Z M2.08301 12.8167V10.0996C2.08301 10.0996 2.0998 12.1166 7.49977 12.1166C12.8999 12.1166 12.9165 10.0996 12.9165 10.0996V12.8499C12.9165 12.8499 12.8829 14.9996 7.48316 14.9996C2.08301 14.9998 2.08301 12.8167 2.08301 12.8167Z"></path>
      </g>
    </svg>,
    <svg fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m12.5 0c-6.88 0-12.5 5.62-12.5 12.5 0 6.92 5.62 12.5 12.5 12.5 1.74 0 3.38-.347 4.9-.979l-8.24-8.24c-.916-.916-1.39-2.11-1.39-3.31 0-1.2.475-2.4 1.39-3.32 1.83-1.83 4.8-1.83 6.63 0l8.21 8.21c.632-1.52.979-3.16.979-4.89.0316-6.92-5.59-12.5-12.5-12.5zm.00195 10.9c-.403 0-.805.151-1.11.451-.316.316-.475.695-.475 1.11 0 .41.159.79.475 1.11l13.2 13.2h-4.33c-.853 0-1.58.694-1.58 1.58 0 .884.694 1.58 1.58 1.58h8.08c.884 0 1.58-.695 1.58-1.58v-.00195-8.08c0-.853-.694-1.58-1.58-1.58-.884 0-1.58.694-1.58 1.58v4.33l-13.2-13.3c-.3-.3-.703-.451-1.11-.451z"
        clip-path="url(#a)"
        fill={color}
      ></path>
      <defs>
        <clipPath id="a">
          <rect width="30" height="30" fill="#fff"></rect>
        </clipPath>
      </defs>
    </svg>,
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M28.5 16.5C29.25 16.5 30 15.75 30 15C30 14.1 29.25 13.5 28.5 13.5H25.5V10.5H28.5C29.25 10.5 30 9.75 30 9C30 8.1 29.25 7.5 28.5 7.5H25.5V6C25.5 5.1 24.75 4.5 24 4.5H22.5V1.5C22.5 0.6 21.75 0 21 0C20.25 0 19.5 0.6 19.5 1.5V4.5H16.5V1.5C16.5 0.6 15.75 0 15 0C14.25 0 13.5 0.6 13.5 1.5V4.5H10.5V1.5C10.5 0.6 9.75 0 9 0C8.25 0 7.5 0.6 7.5 1.5V4.5H6C5.25 4.5 4.5 5.1 4.5 6V7.5H1.5C0.75 7.5 0 8.1 0 9C0 9.75 0.75 10.5 1.5 10.5H4.5V13.5H1.5C0.75 13.5 0 14.1 0 15C0 15.75 0.75 16.5 1.5 16.5H4.5V19.5H1.5C0.75 19.5 0 20.1 0 21C0 21.75 0.75 22.5 1.5 22.5H4.5V24C4.5 24.75 5.25 25.5 6 25.5H7.5V28.5C7.5 29.25 8.25 30 9 30C9.75 30 10.5 29.25 10.5 28.5V25.5H13.5V28.5C13.5 29.25 14.25 30 15 30C15.75 30 16.5 29.25 16.5 28.5V25.5H19.5V28.5C19.5 29.25 20.25 30 21 30C21.75 30 22.5 29.25 22.5 28.5V25.5H24C24.75 25.5 25.5 24.75 25.5 24V22.5H28.5C29.25 22.5 30 21.75 30 21C30 20.1 29.25 19.5 28.5 19.5H25.5V16.5H28.5ZM22.5 22.5H7.5V7.5H22.5V22.5Z M 10.5 10.5 H 19.5 V 19.5 H 10.5 V10.5 Z"
      ></path>
    </svg>,
    <svg viewBox="0 0 30 30" fill={color} xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.97198 10.5412L13.4224 1.71242C14.3233 0.991695 15.7648 0.991695 16.5756 1.71242L27.026 10.5412L15.945 19.9106C15.4945 20.3611 14.5936 20.3611 14.0531 19.9106L2.97198 10.5412Z"
          fill=""
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.80341 26.306V12.0718L10.1818 19.1889L1.80341 26.306Z"
          fill=""
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.855 28.9192H4.14328C3.60274 28.9192 3.15229 28.739 2.70184 28.3786L11.7109 20.4507C14.5036 22.793 15.5847 22.793 18.3775 20.4507L27.2964 28.1083C27.4766 28.739 26.2154 28.9192 25.855 28.9192Z"
          fill=""
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28.2895 26.306L19.821 19.1889L28.1994 12.0718L28.2895 26.306Z"
          fill=""
        ></path>
      </g>
    </svg>,
  ];

  const operationIconsIndex =
    method == "POST" ? 2 : method == "Get" ? 1 : messaging == "kafka" ? 3 : 0;

  return (
    <div
      className="timeline-details"
      style={{
        flexBasis: 450 - node.id * 20,
      }}
    >
      {node.children.length > 0 && (
        <span className="chevron-icon" onClick={handleExpand}>
          {expanded ? <GoChevronDown /> : <GoChevronRight />}
        </span>
      )}
      <span className="operation-icon">{svgArray[operationIconsIndex]}</span>
      <span>{node.attrs["service.name"]}</span>
      <span>{(http === "http" && "HTTP") || db || messaging}</span>
      <span>{method}</span>
      <span className="route">
        {pathName || (method == "GET" && hostName) || routeName}
      </span>
    </div>
  );
};

const TimeLineSpan: React.FC<TreeNodeProps> = ({ node }) => {
  const nodeIndex = numbers.sortedDates.findIndex(
    (date) => date == node.startTime
  );

  const highestDuration = getHighestDuration(data);
  const startTime = numbers.numbers[nodeIndex];
  const color =
    node.attrs["service.name"] === "orders-service"
      ? "#ff951f"
      : node.attrs["service.name"] === "authentication-service"
      ? "#cc7600"
      : "#ce92d8";
  return (
    <div className="timeline-span-container">
      <div
        className="timeline-span"
        style={{
          marginLeft: `${
            (startTime * 100) / Math.ceil(highestDuration / 1000000)
          }%`,
          width: `${(node.duration * 100) / highestDuration}%`,

          backgroundColor: `${color}`,
        }}
      ></div>
    </div>
  );
};
