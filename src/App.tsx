import React from "react";
import { data } from "./data/dataset.ts";
import Tree from "./components/Tree.tsx";
import { buildTree } from "./utils/utils.ts";

const tree = buildTree(data, undefined);

export default function App() {
  return (
    <div>
      <Tree tree={tree} />
    </div>
  );
}
