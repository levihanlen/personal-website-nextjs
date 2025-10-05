"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
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

const NODE_RADIUS = 8;
const HOVER_NODE_RADIUS = 12;
const PADDING_X = 60;
const PADDING_Y = 60;
const MIN_WIDTH = 800;
const BASE_SIZE = 600;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const nodeVelocities = useRef<Map<string, { vx: number; vy: number }>>(
    new Map()
  );
  const animationFrameId = useRef<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const velocities = new Map<string, { vx: number; vy: number }>();
    for (const n of layout.nodes) {
      positions.set(n.id, { x: n.x, y: n.y });
      velocities.set(n.id, { vx: 0, vy: 0 });
    }
    setNodePositions(positions);
    nodeVelocities.current = velocities;
  }, [layout]);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const SPRING_STRENGTH = 0.008;
    const REPULSION_STRENGTH = 800;
    const IDEAL_DISTANCE = 80;
    const MIN_DISTANCE = 30;
    const DAMPING = 0.92;
    const MAX_VELOCITY = 2;

    const connectedNodesMap = new Map<string, Set<string>>();
    for (const edge of layout.edges) {
      if (!connectedNodesMap.has(edge.fromId)) {
        connectedNodesMap.set(edge.fromId, new Set());
      }
      if (!connectedNodesMap.has(edge.toId)) {
        connectedNodesMap.set(edge.toId, new Set());
      }
      connectedNodesMap.get(edge.fromId)!.add(edge.toId);
      connectedNodesMap.get(edge.toId)!.add(edge.fromId);
    }

    function simulatePhysics() {
      setNodePositions((currentPositions) => {
        const newPositions = new Map(currentPositions);
        const velocities = nodeVelocities.current;

        for (const nodeA of layout.nodes) {
          if (draggingNode === nodeA.id) continue;

          const posA = newPositions.get(nodeA.id);
          const velA = velocities.get(nodeA.id);
          if (!posA || !velA) continue;

          let fx = 0;
          let fy = 0;

          for (const nodeB of layout.nodes) {
            if (nodeA.id === nodeB.id) continue;

            const posB = newPositions.get(nodeB.id);
            if (!posB) continue;

            const dx = posB.x - posA.x;
            const dy = posB.y - posA.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < 0.1) continue;

            const connectedA = connectedNodesMap.get(nodeA.id);
            const isConnected = connectedA?.has(nodeB.id);

            if (isConnected) {
              const delta = dist - IDEAL_DISTANCE;
              const force = SPRING_STRENGTH * delta;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            } else {
              const force =
                REPULSION_STRENGTH /
                Math.max(distSq, MIN_DISTANCE * MIN_DISTANCE);
              fx -= (dx / dist) * force;
              fy -= (dy / dist) * force;
            }
          }

          velA.vx = (velA.vx + fx) * DAMPING;
          velA.vy = (velA.vy + fy) * DAMPING;

          velA.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velA.vx));
          velA.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velA.vy));

          posA.x += velA.vx;
          posA.y += velA.vy;

          const margin = PADDING_X;
          posA.x = Math.max(margin, Math.min(layout.width - margin, posA.x));
          posA.y = Math.max(margin, Math.min(layout.height - margin, posA.y));
        }

        return newPositions;
      });

      animationFrameId.current = requestAnimationFrame(simulatePhysics);
    }

    animationFrameId.current = requestAnimationFrame(simulatePhysics);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [layout, draggingNode]);

  const getConnectedNodes = useCallback(
    (nodeId: string): Set<string> => {
      const connected = new Set<string>();
      for (const edge of layout.edges) {
        if (edge.fromId === nodeId) connected.add(edge.toId);
        if (edge.toId === nodeId) connected.add(edge.fromId);
      }
      return connected;
    },
    [layout.edges]
  );

  const transformPoint = useCallback(
    (x: number, y: number) => {
      return {
        x: x * zoom + pan.x,
        y: y * zoom + pan.y,
      };
    },
    [zoom, pan]
  );

  const inverseTransformPoint = useCallback(
    (x: number, y: number) => {
      return {
        x: (x - pan.x) / zoom,
        y: (y - pan.y) / zoom,
      };
    },
    [zoom, pan]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.save();

    const connectedToHovered = hoveredNode
      ? getConnectedNodes(hoveredNode)
      : new Set<string>();
    const connectedToSelected = selectedNode
      ? getConnectedNodes(selectedNode)
      : new Set<string>();

    for (const edge of layout.edges) {
      const from = nodePositions.get(edge.fromId);
      const to = nodePositions.get(edge.toId);
      if (!from || !to) continue;

      const fromTransformed = transformPoint(from.x, from.y);
      const toTransformed = transformPoint(to.x, to.y);

      const isHighlighted =
        (hoveredNode &&
          (edge.fromId === hoveredNode || edge.toId === hoveredNode)) ||
        (selectedNode &&
          (edge.fromId === selectedNode || edge.toId === selectedNode));

      ctx.beginPath();
      ctx.moveTo(fromTransformed.x, fromTransformed.y);
      ctx.lineTo(toTransformed.x, toTransformed.y);

      if (isHighlighted) {
        ctx.strokeStyle = isDarkMode
          ? "rgba(147, 197, 253, 0.8)"
          : "rgba(59, 130, 246, 0.8)";
        ctx.lineWidth = 2.5 * zoom;
      } else {
        ctx.strokeStyle = isDarkMode
          ? "rgba(115, 115, 115, 0.3)"
          : "rgba(212, 212, 212, 0.6)";
        ctx.lineWidth = 1.5 * zoom;
      }
      ctx.stroke();
    }

    for (const node of layout.nodes) {
      const pos = nodePositions.get(node.id);
      if (!pos) continue;

      const transformed = transformPoint(pos.x, pos.y);
      const isHovered = hoveredNode === node.id;
      const isSelected = selectedNode === node.id;
      const isConnected =
        connectedToHovered.has(node.id) || connectedToSelected.has(node.id);

      const radius = (isHovered ? HOVER_NODE_RADIUS : NODE_RADIUS) * zoom;

      ctx.beginPath();
      ctx.arc(transformed.x, transformed.y, radius, 0, Math.PI * 2);

      if (isHovered || isSelected) {
        ctx.fillStyle = isDarkMode
          ? "rgba(96, 165, 250, 0.9)"
          : "rgba(59, 130, 246, 0.9)";
        ctx.shadowColor = isDarkMode
          ? "rgba(96, 165, 250, 0.5)"
          : "rgba(59, 130, 246, 0.5)";
        ctx.shadowBlur = 15 * zoom;
      } else if (isConnected) {
        ctx.fillStyle = isDarkMode
          ? "rgba(147, 197, 253, 0.6)"
          : "rgba(147, 197, 253, 0.8)";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = isDarkMode
          ? "rgba(38, 38, 38, 0.95)"
          : "rgba(255, 255, 255, 0.95)";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }
      ctx.fill();

      ctx.strokeStyle =
        isHovered || isSelected
          ? isDarkMode
            ? "rgba(147, 197, 253, 1)"
            : "rgba(59, 130, 246, 1)"
          : isDarkMode
          ? "rgba(82, 82, 82, 0.8)"
          : "rgba(163, 163, 163, 0.8)";
      ctx.lineWidth = (isHovered || isSelected ? 2.5 : 1.5) * zoom;
      ctx.stroke();

      if (isHovered || isSelected) {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.fillStyle = isDarkMode
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(0, 0, 0, 0.9)";
        ctx.font = `${Math.max(
          10,
          12 * zoom
        )}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const text = node.node.text;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = 14 * zoom;
        const padding = 6 * zoom;

        const boxX = transformed.x - textWidth / 2 - padding;
        const boxY = transformed.y + radius + 8 * zoom;

        ctx.fillStyle = isDarkMode
          ? "rgba(38, 38, 38, 0.95)"
          : "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = isDarkMode
          ? "rgba(82, 82, 82, 0.8)"
          : "rgba(212, 212, 212, 0.8)";
        ctx.lineWidth = 1 * zoom;
        ctx.beginPath();
        ctx.roundRect(
          boxX,
          boxY,
          textWidth + padding * 2,
          textHeight + padding * 2,
          4 * zoom
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDarkMode
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(0, 0, 0, 0.9)";
        ctx.fillText(text, transformed.x, boxY + padding);
      }
    }

    ctx.restore();
  }, [
    layout,
    nodePositions,
    hoveredNode,
    selectedNode,
    transformPoint,
    getConnectedNodes,
    zoom,
    isDarkMode,
  ]);

  useEffect(() => {
    draw();
  }, [draw]);

  const getNodeAtPosition = useCallback(
    (x: number, y: number): string | null => {
      const inverted = inverseTransformPoint(x, y);
      for (const node of layout.nodes) {
        const pos = nodePositions.get(node.id);
        if (!pos) continue;
        const dx = inverted.x - pos.x;
        const dy = inverted.y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= HOVER_NODE_RADIUS) {
          return node.id;
        }
      }
      return null;
    },
    [layout.nodes, nodePositions, inverseTransformPoint]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
        return;
      }

      if (draggingNode) {
        const inverted = inverseTransformPoint(x, y);
        setNodePositions((prev) => {
          const newMap = new Map(prev);
          newMap.set(draggingNode, {
            x: inverted.x - dragOffset.x,
            y: inverted.y - dragOffset.y,
          });
          return newMap;
        });
        return;
      }

      const nodeId = getNodeAtPosition(x, y);
      setHoveredNode(nodeId);
      canvas.style.cursor = nodeId ? "pointer" : "grab";
    },
    [
      draggingNode,
      dragOffset,
      getNodeAtPosition,
      inverseTransformPoint,
      isPanning,
      panStart,
    ]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const nodeId = getNodeAtPosition(x, y);

      if (nodeId) {
        const inverted = inverseTransformPoint(x, y);
        const pos = nodePositions.get(nodeId);
        if (pos) {
          setDraggingNode(nodeId);
          setDragOffset({
            x: inverted.x - pos.x,
            y: inverted.y - pos.y,
          });
          setSelectedNode(nodeId);
        }
      } else {
        setIsPanning(true);
        setPanStart({
          x: e.clientX - pan.x,
          y: e.clientY - pan.y,
        });
        setSelectedNode(null);
      }
    },
    [getNodeAtPosition, nodePositions, inverseTransformPoint, pan]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingNode(null);
    setIsPanning(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = hoveredNode ? "pointer" : "grab";
    }
  }, [hoveredNode]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.3, Math.min(3, prev * delta)));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null);
    setDraggingNode(null);
    setIsPanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden lh-round lh-border bg-lightest lh-border"
    >
      <canvas
        ref={canvasRef}
        width={layout.width}
        height={layout.height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        // style={{ width: "100%", height: layout.height }}
        className="cursor-grab active:cursor-grabbing w-full aspect-square"
      />
      <div className="absolute bottom-4 right-4 flex gap-2 bg-lightest lh-round px-4 py-2 text-xs text-dark lh-border">
        <span>Drag nodes • Scroll to zoom • Drag background to pan</span>
      </div>
    </div>
  );
}

export { KnowledgeGraphChart };
