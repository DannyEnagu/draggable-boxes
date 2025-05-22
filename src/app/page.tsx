'use client';

import { useState } from "react";

interface Box {
  id: string;
  color: string;
  x: number;
  y: number;
}

const initialBoxes: Box[] = [
  { id: 'box1', color: 'bg-yellow-500', x: 50, y: 50 },
  { id: 'box2', color: 'bg-red-500', x: 200, y: 50 },
  { id: 'box3', color: 'bg-green-500', x: 350, y: 50 },
];

export default function Home() {
  const [boxes, setBoxes] = useState<Box[]>(initialBoxes);
  // Track the currently dragged box's id
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Set dragged box's id
  function handleDragStart(ev: React.DragEvent<HTMLDivElement>) {
    setDraggedId(ev.currentTarget.id);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Updates the position of the dragged box
  // so it centers under the cursor
  function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    if (!draggedId) return;
    const rect = ev.currentTarget.getBoundingClientRect();
    // Center the box under the cursor when dropped
    const boxSize = 112; // w-28/h-28 = 7rem = 112px
    const x = ev.clientX - rect.left - boxSize / 2;
    const y = ev.clientY - rect.top - boxSize / 2;
    setBoxes(prev =>
      prev.map(box =>
        box.id === draggedId ? { ...box, x, y } : box
      )
    );
    // Reset currently dragged box's id
    setDraggedId(null);
  }

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className="relative w-full h-full border-8 border-blue-500 bg-slate-800">
      {boxes.map(box => (
        <div
          key={box.id}
          id={box.id}
          className={`${box.color} w-28 h-28 m-0 cursor-pointer absolute rounded`}
          style={{ left: box.x, top: box.y }}
          draggable
          onDragStart={ev => handleDragStart(ev)}
        />
      ))}
    </div>
  );
}
