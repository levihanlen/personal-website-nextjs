"use client";

import { useMemo } from "react";
import { KnowledgeGraphNode, KnowledgeNode } from "./types";
import { buildKnowledgeGraph } from "./build";

type Props = {
  nodes: KnowledgeNode[] | KnowledgeGraphNode[];
  direction?: "dependents" | "dependencies";
  maxDepth?: number;
};

function isGraphNodeArray(
  nodes: KnowledgeNode[] | KnowledgeGraphNode[]
): nodes is KnowledgeGraphNode[] {
  return nodes.length > 0 && "directDependencies" in (nodes[0] as object);
}

function getRoots(
  graphNodes: KnowledgeGraphNode[],
  direction: "dependents" | "dependencies"
): KnowledgeGraphNode[] {
  if (direction === "dependencies") {
    return graphNodes.filter((n) => n.directDependents.length === 0);
  }
  return graphNodes.filter((n) => n.directDependencies.length === 0);
}

function byImportanceDesc(a: KnowledgeGraphNode, b: KnowledgeGraphNode) {
  return b.allDependents.length - a.allDependents.length;
}

type PositionedNode = {
  id: string;
  node: KnowledgeGraphNode;
  x: number;
  y: number;
};

type Edge = {
  fromId: string;
  toId: string;
};

const NODE_RADIUS = 6;
const H_SPACING = 160;
const V_SPACING = 64;
const GROUP_GAP = 80;
const PADDING_X = 24;
const PADDING_Y = 24;

function getChildrenForDirection(
  n: KnowledgeGraphNode,
  indexByText: Map<string, KnowledgeGraphNode>,
  direction: "dependents" | "dependencies"
): KnowledgeGraphNode[] {
  const candidates =
    direction === "dependencies" ? n.directDependencies : n.directDependents;
  const resolved: KnowledgeGraphNode[] = [];
  for (const c of candidates) {
    const ref = indexByText.get(c.text);
    if (ref) resolved.push(ref);
  }
  return resolved;
}

function buildGroupLayout(
  root: KnowledgeGraphNode,
  indexByText: Map<string, KnowledgeGraphNode>,
  direction: "dependents" | "dependencies",
  maxDepth?: number
): { nodes: PositionedNode[]; edges: Edge[]; width: number; height: number } {
  const visited = new Set<string>();
  const queue: Array<{ node: KnowledgeGraphNode; depth: number }> = [
    { node: root, depth: 0 },
  ];
  const levels: Map<number, KnowledgeGraphNode[]> = new Map();
  const parentToChildren: Array<{
    parent: KnowledgeGraphNode;
    child: KnowledgeGraphNode;
  }> = [];

  while (queue.length > 0) {
    const { node, depth } = queue.shift() as {
      node: KnowledgeGraphNode;
      depth: number;
    };
    if (visited.has(node.text)) continue;
    visited.add(node.text);
    if (!levels.has(depth)) levels.set(depth, []);
    (levels.get(depth) as KnowledgeGraphNode[]).push(node);
    if (maxDepth !== undefined && depth >= maxDepth) continue;
    const children = getChildrenForDirection(node, indexByText, direction);
    for (const child of children) {
      parentToChildren.push({ parent: node, child });
      if (!visited.has(child.text))
        queue.push({ node: child, depth: depth + 1 });
    }
  }

  const depthKeys = Array.from(levels.keys()).sort((a, b) => a - b);
  const width = depthKeys.length * H_SPACING;
  let maxPerLevel = 1;
  for (const d of depthKeys) {
    const arr = levels.get(d) as KnowledgeGraphNode[];
    if (arr.length > maxPerLevel) maxPerLevel = arr.length;
  }
  const height = Math.max(1, maxPerLevel) * V_SPACING;

  const positioned: PositionedNode[] = [];
  const idForNode = new Map<string, string>();
  for (const d of depthKeys) {
    const arr = (levels.get(d) as KnowledgeGraphNode[]).slice();
    arr.sort(byImportanceDesc);
    const count = arr.length;
    for (let i = 0; i < arr.length; i += 1) {
      const n = arr[i];
      const x = d * H_SPACING;
      const y = (i + 1) * (height / (count + 1));
      const id = `${root.text}|${n.text}`;
      idForNode.set(n.text, id);
      positioned.push({ id, node: n, x, y });
    }
  }

  const edges: Edge[] = [];
  for (const { parent, child } of parentToChildren) {
    const fromId = idForNode.get(parent.text) as string;
    const toId = idForNode.get(child.text) as string;
    if (fromId && toId) edges.push({ fromId, toId });
  }

  return { nodes: positioned, edges, width, height };
}

function KnowledgeGraphChart({
  nodes,
  direction = "dependents",
  maxDepth,
}: Props) {
  const graphNodes = useMemo<KnowledgeGraphNode[]>(() => {
    if (isGraphNodeArray(nodes)) return nodes as KnowledgeGraphNode[];
    return buildKnowledgeGraph(nodes as KnowledgeNode[]);
  }, [nodes]);

  const indexByText = useMemo(() => {
    const m = new Map<string, KnowledgeGraphNode>();
    for (const n of graphNodes) m.set(n.text, n);
    return m;
  }, [graphNodes]);

  const roots = useMemo(
    () => getRoots(graphNodes, direction).sort(byImportanceDesc),
    [graphNodes, direction]
  );

  const layout = useMemo(() => {
    const groups = roots.map((r) =>
      buildGroupLayout(r, indexByText, direction, maxDepth)
    );
    const svgWidth = Math.max(0, ...groups.map((g) => g.width)) + PADDING_X * 2;
    const svgHeight =
      groups.reduce(
        (acc, g, i) => acc + g.height + (i > 0 ? GROUP_GAP : 0),
        0
      ) +
      PADDING_Y * 2;

    const allNodes: PositionedNode[] = [];
    const allEdges: Edge[] = [];
    let yOffset = PADDING_Y;
    for (const g of groups) {
      const nodeMap = new Map<string, { x: number; y: number }>();
      for (const pn of g.nodes) {
        const x = pn.x + PADDING_X;
        const y = pn.y + yOffset;
        allNodes.push({ ...pn, x, y });
        nodeMap.set(pn.id, { x, y });
      }
      for (const e of g.edges) {
        const from = nodeMap.get(e.fromId);
        const to = nodeMap.get(e.toId);
        if (from && to) allEdges.push({ fromId: e.fromId, toId: e.toId });
      }
      yOffset += g.height + GROUP_GAP;
    }

    return {
      width: svgWidth,
      height: Math.max(PADDING_Y * 2, svgHeight),
      nodes: allNodes,
      edges: allEdges,
    };
  }, [roots, indexByText, direction, maxDepth]);

  const coordsById = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const n of layout.nodes) map.set(n.id, { x: n.x, y: n.y });
    return map;
  }, [layout.nodes]);

  return (
    <div className="overflow-x-auto">
      <svg
        width={layout.width}
        height={layout.height}
        className="min-w-[640px]"
      >
        <g>
          {layout.edges.map((e, i) => {
            const from = coordsById.get(e.fromId) as { x: number; y: number };
            const to = coordsById.get(e.toId) as { x: number; y: number };
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="currentColor"
                className="text-neutral-300 dark:text-neutral-700"
                strokeWidth={1.5}
              />
            );
          })}
        </g>
        <g>
          {layout.nodes.map((n) => (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={NODE_RADIUS}
              className="fill-white dark:fill-neutral-900 stroke-neutral-400 dark:stroke-neutral-600"
              strokeWidth={1.5}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export { KnowledgeGraphChart };
