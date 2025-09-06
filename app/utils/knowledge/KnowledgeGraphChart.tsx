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
const PADDING_X = 24;
const PADDING_Y = 24;
const MIN_WIDTH = 640;
const BASE_SIZE = 480;

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

type Network = {
  nodeIds: string[];
  nodesById: Map<string, KnowledgeGraphNode>;
  edges: Edge[];
};

function buildNetwork(
  roots: KnowledgeGraphNode[],
  indexByText: Map<string, KnowledgeGraphNode>,
  direction: "dependents" | "dependencies",
  maxDepth?: number
): Network {
  const included = new Set<string>();
  const edges: Edge[] = [];
  const edgeSet = new Set<string>();
  const queue: Array<{ node: KnowledgeGraphNode; depth: number }> = [];
  for (const r of roots) queue.push({ node: r, depth: 0 });
  while (queue.length > 0) {
    const { node, depth } = queue.shift() as {
      node: KnowledgeGraphNode;
      depth: number;
    };
    if (!included.has(node.text)) included.add(node.text);
    if (maxDepth !== undefined && depth >= maxDepth) continue;
    const children = getChildrenForDirection(node, indexByText, direction);
    for (const child of children) {
      const key = `${node.text}|${child.text}`;
      if (!edgeSet.has(key)) {
        edges.push({ fromId: node.text, toId: child.text });
        edgeSet.add(key);
      }
      if (!included.has(child.text))
        queue.push({ node: child, depth: depth + 1 });
    }
  }
  const nodesById = new Map<string, KnowledgeGraphNode>();
  for (const id of included) {
    const ref = indexByText.get(id);
    if (ref) nodesById.set(id, ref);
  }
  const nodeIds = Array.from(nodesById.keys());
  return { nodeIds, nodesById, edges };
}

type Position = { x: number; y: number; vx: number; vy: number };

function runForceLayout(network: Network): {
  width: number;
  height: number;
  positions: Map<string, { x: number; y: number }>;
} {
  const n = network.nodeIds.length;
  const width =
    Math.max(MIN_WIDTH, Math.floor(Math.sqrt(n + 1)) * 160) + PADDING_X * 2;
  const height =
    Math.max(BASE_SIZE, Math.floor(Math.sqrt(n + 1)) * 120) + PADDING_Y * 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const linkDistance = 96;
  const chargeStrength = -6000;
  const springStrength = 0.02;
  const centeringStrength = 0.01;
  const damping = 0.85;
  const iterations = Math.min(600, 100 + n * 20);
  const positions = new Map<string, Position>();
  for (const id of network.nodeIds) {
    const rx = PADDING_X + Math.random() * (width - PADDING_X * 2);
    const ry = PADDING_Y + Math.random() * (height - PADDING_Y * 2);
    positions.set(id, { x: rx, y: ry, vx: 0, vy: 0 });
  }
  for (let k = 0; k < iterations; k += 1) {
    for (let i = 0; i < network.nodeIds.length; i += 1) {
      const idA = network.nodeIds[i];
      const a = positions.get(idA) as Position;
      for (let j = i + 1; j < network.nodeIds.length; j += 1) {
        const idB = network.nodeIds[j];
        const b = positions.get(idB) as Position;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy + 0.01;
        const force = chargeStrength / dist2;
        const invDist = 1 / Math.sqrt(dist2);
        const fx = dx * invDist * force;
        const fy = dy * invDist * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }
    for (const e of network.edges) {
      const a = positions.get(e.fromId) as Position;
      const b = positions.get(e.toId) as Position;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(0.01, Math.sqrt(dx * dx + dy * dy));
      const delta = dist - linkDistance;
      const force = springStrength * delta;
      const ux = dx / dist;
      const uy = dy / dist;
      const fx = force * ux;
      const fy = force * uy;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }
    for (const id of network.nodeIds) {
      const p = positions.get(id) as Position;
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      p.vx += dx * centeringStrength;
      p.vy += dy * centeringStrength;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= damping;
      p.vy *= damping;
      if (p.x < PADDING_X) p.x = PADDING_X;
      if (p.x > width - PADDING_X) p.x = width - PADDING_X;
      if (p.y < PADDING_Y) p.y = PADDING_Y;
      if (p.y > height - PADDING_Y) p.y = height - PADDING_Y;
    }
  }
  const final = new Map<string, { x: number; y: number }>();
  for (const id of network.nodeIds) {
    const p = positions.get(id) as Position;
    final.set(id, { x: p.x, y: p.y });
  }
  return { width, height, positions: final };
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
    const network = buildNetwork(roots, indexByText, direction, maxDepth);
    const sim = runForceLayout(network);
    const nodes: PositionedNode[] = network.nodeIds.map((id) => {
      const pos = sim.positions.get(id) as { x: number; y: number };
      const node = network.nodesById.get(id) as KnowledgeGraphNode;
      return { id, node, x: pos.x, y: pos.y };
    });
    const edges: Edge[] = network.edges;
    return { width: sim.width, height: sim.height, nodes, edges };
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
