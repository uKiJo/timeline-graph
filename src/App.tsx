import { data } from "./data/dataset.ts";
import Tree from "./components/Tree/Tree.tsx";
import { buildTree } from "./utils/utils.ts";

const tree = buildTree(data, undefined, 0);
console.log(tree);

export default function App() {
  return (
    <div>
      <Tree tree={tree} />
    </div>
  );
}
