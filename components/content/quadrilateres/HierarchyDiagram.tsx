"use client";
import { useState } from "react";

type NodeId =
  | "quadrilatere"
  | "trapeze"
  | "parallelogramme"
  | "rectangle"
  | "losange"
  | "carre";

type NodeDef = {
  id: NodeId;
  label: string;
  properties: string[];
  parents: NodeId[];
  shape: string; // SVG polygon points in local coords (0-64 x, 0-44 y)
  x: number;    // position in 900×625 container
  y: number;
};

const W = 140;
const H = 96;

const nodes: NodeDef[] = [
  {
    id: "quadrilatere",
    label: "Quadrilatère",
    properties: ["4 côtés", "4 sommets"],
    parents: [],
    // Irregular quadrilateral — no parallel sides
    shape: "5,38 54,42 58,6 15,2",
    x: 380,
    y: 10,
  },
  {
    id: "trapeze",
    label: "Trapèze",
    properties: ["1 paire de côtés parallèles"],
    parents: ["quadrilatere"],
    // Trapezoid: bottom wider than top, both horizontal
    shape: "3,40 58,40 47,5 14,5",
    x: 380,
    y: 140,
  },
  {
    id: "parallelogramme",
    label: "Parallélogramme",
    properties: ["2 paires de côtés parallèles"],
    parents: ["trapeze"],
    // Clearly slanted parallelogram
    shape: "10,40 60,40 50,4 0,4",
    x: 380,
    y: 270,
  },
  {
    id: "rectangle",
    label: "Rectangle",
    properties: ["4 angles droits", "côtés opposés égaux"],
    parents: ["parallelogramme"],
    // Rectangle: clearly wider than tall
    shape: "3,36 57,36 57,8 3,8",
    x: 175,
    y: 405,
  },
  {
    id: "losange",
    label: "Losange",
    properties: ["4 côtés égaux", "diagonales ⊥"],
    parents: ["parallelogramme"],
    // Diamond shape
    shape: "30,42 58,22 30,2 2,22",
    x: 585,
    y: 405,
  },
  {
    id: "carre",
    label: "Carré",
    properties: ["4 côtés égaux", "4 angles droits"],
    parents: ["rectangle", "losange"],
    // True square: 36×36 in local coords
    shape: "12,40 48,40 48,4 12,4",
    x: 380,
    y: 520,
  },
];

const connections: [NodeId, NodeId][] = [
  ["quadrilatere", "trapeze"],
  ["trapeze", "parallelogramme"],
  ["parallelogramme", "rectangle"],
  ["parallelogramme", "losange"],
  ["rectangle", "carre"],
  ["losange", "carre"],
];

function getAncestors(id: NodeId): Set<NodeId> {
  const result = new Set<NodeId>();
  const queue = [...(nodes.find((n) => n.id === id)?.parents ?? [])];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.add(current);
    nodes.find((n) => n.id === current)?.parents.forEach((p) => {
      if (!result.has(p)) queue.push(p);
    });
  }
  return result;
}

function getDescendants(id: NodeId): Set<NodeId> {
  const result = new Set<NodeId>();
  const queue = nodes.filter((n) => n.parents.includes(id)).map((n) => n.id);
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.add(current);
    nodes
      .filter((n) => n.parents.includes(current))
      .forEach((n) => {
        if (!result.has(n.id)) queue.push(n.id);
      });
  }
  return result;
}

function getLineEndpoints(from: NodeDef, to: NodeDef) {
  return {
    x1: from.x + W / 2,
    y1: from.y + H,
    x2: to.x + W / 2,
    y2: to.y,
  };
}

export default function HierarchyDiagram() {
  const [selected, setSelected] = useState<NodeId | null>(null);

  const ancestors = selected ? getAncestors(selected) : new Set<NodeId>();
  const descendants = selected ? getDescendants(selected) : new Set<NodeId>();

  function getNodeStyle(id: NodeId) {
    if (!selected) {
      return { fill: "#F8FAFF", stroke: "#CBD5E1", opacity: 1, textColor: "#1E293B" };
    }
    if (id === selected) {
      return { fill: "#DBEAFE", stroke: "#3B82F6", opacity: 1, textColor: "#1D4ED8" };
    }
    if (ancestors.has(id)) {
      return { fill: "#DCFCE7", stroke: "#22C55E", opacity: 1, textColor: "#15803D" };
    }
    if (descendants.has(id)) {
      return { fill: "#FED7AA", stroke: "#F97316", opacity: 1, textColor: "#C2410C" };
    }
    return { fill: "#F1F5F9", stroke: "#CBD5E1", opacity: 0.3, textColor: "#94A3B8" };
  }

  function getLineStyle(from: NodeId, to: NodeId): { stroke: string; opacity: number } {
    if (!selected) return { stroke: "#94A3B8", opacity: 0.6 };

    // Line goes from an ancestor toward selected
    if (ancestors.has(from) && (ancestors.has(to) || to === selected)) {
      return { stroke: "#22C55E", opacity: 1 };
    }
    // Line goes from selected toward a descendant
    if (from === selected && descendants.has(to)) {
      return { stroke: "#F97316", opacity: 1 };
    }
    // Line between two descendants
    if (descendants.has(from) && descendants.has(to)) {
      return { stroke: "#F97316", opacity: 1 };
    }
    return { stroke: "#CBD5E1", opacity: 0.15 };
  }

  const selectedNode = nodes.find((n) => n.id === selected);

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-3 text-center">
        Clique sur une figure pour voir ses liens avec les autres
      </p>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: 900 }}>
          <svg
            viewBox="0 0 900 625"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              {(
                [
                  ["arrow", "#94A3B8"],
                  ["arrow-green", "#22C55E"],
                  ["arrow-orange", "#F97316"],
                ] as [string, string][]
              ).map(([id, color]) => (
                <marker
                  key={id}
                  id={id}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L8,3 z" fill={color} />
                </marker>
              ))}
            </defs>

            {/* Connection lines */}
            {connections.map(([fromId, toId]) => {
              const fromNode = nodes.find((n) => n.id === fromId)!;
              const toNode = nodes.find((n) => n.id === toId)!;
              const { x1, y1, x2, y2 } = getLineEndpoints(fromNode, toNode);
              const { stroke, opacity } = getLineStyle(fromId, toId);
              const markerId =
                stroke === "#22C55E"
                  ? "arrow-green"
                  : stroke === "#F97316"
                  ? "arrow-orange"
                  : "arrow";

              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2 + 6}
                  stroke={stroke}
                  strokeWidth={selected ? 2.5 : 1.5}
                  opacity={opacity}
                  markerEnd={`url(#${markerId})`}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {/* Node cards */}
            {nodes.map((node) => {
              const { fill, stroke, opacity, textColor } = getNodeStyle(node.id);
              const isSelected = node.id === selected;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() =>
                    setSelected(node.id === selected ? null : node.id)
                  }
                  style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
                  opacity={opacity}
                >
                  <rect
                    width={W}
                    height={H}
                    rx={12}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    style={{
                      transition: "all 0.3s ease",
                      filter: isSelected
                        ? "drop-shadow(0 4px 12px rgba(59,130,246,0.25))"
                        : "none",
                    }}
                  />
                  {/* Shape preview */}
                  <g transform="translate(38, 7)">
                    <polygon
                      points={node.shape}
                      fill={isSelected ? "#BFDBFE" : "#E2E8F0"}
                      stroke={stroke}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </g>
                  {/* Label */}
                  <text
                    x={W / 2}
                    y={62}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={textColor}
                    style={{
                      transition: "fill 0.3s ease",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {node.label}
                  </text>
                  {/* Properties */}
                  {node.properties.map((prop, i) => (
                    <text
                      key={i}
                      x={W / 2}
                      y={76 + i * 12}
                      textAnchor="middle"
                      fontSize="9"
                      fill={textColor}
                      opacity={0.8}
                      style={{
                        transition: "fill 0.3s ease",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {prop}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500" />
          <span className="text-gray-600">Figure sélectionnée</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500" />
          <span className="text-gray-600">Figure plus générale</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-orange-100 border-2 border-orange-500" />
          <span className="text-gray-600">Cas particulier</span>
        </div>
      </div>

      {/* Info panel */}
      {selectedNode && (
        <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm">
          <p className="font-semibold text-blue-900 mb-1">{selectedNode.label}</p>
          <ul className="list-disc list-inside text-blue-800 space-y-0.5">
            {selectedNode.properties.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          {ancestors.size > 0 && (
            <p className="mt-2 text-green-800">
              <span className="font-medium">Est un cas particulier de : </span>
              {Array.from(ancestors)
                .map((id) => nodes.find((n) => n.id === id)!.label)
                .join(", ")}
            </p>
          )}
          {descendants.size > 0 && (
            <p className="mt-1 text-orange-800">
              <span className="font-medium">Ses cas particuliers : </span>
              {Array.from(descendants)
                .map((id) => nodes.find((n) => n.id === id)!.label)
                .join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
