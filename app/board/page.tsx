"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react';
import { TextNodeShape } from './components/TextNode';

// Konva を使うコンポーネントは dynamic import する必要があるみたい
const Board = dynamic(() => import('./components/Board'), { ssr: false })

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [boardSize, setBoardSize] = useState({ width: 800, height: 600 })
  const [textNodeShapes, setTextNodeShapes] = useState<TextNodeShape[]>([
    {
      id: "1",
      text: "Hello World!!",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      stroke: "#ddd",
      fill: "#555",
      draggable: true,
    },
    {
      id: "2",
      text: "Hello World!!",
      x: 200,
      y: 300,
      width: 100,
      height: 100,
      stroke: "#ddd",
      fill: "#555",
      draggable: true,
    },
  ]);

  useEffect(() => {
    // 画面サイズに合わせてボードのサイズを調整
    const handleResize = () => {
      if (!containerRef.current) return
      setBoardSize({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className='relative h-screen w-full bg-red-200'>
      <Board size={boardSize} textNodeShapes={textNodeShapes} setTextNodeShapes={setTextNodeShapes} />
      <aside className="absolute w-64 h-auto bg-gray-800 text-white p-4 top-2 right-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          onClick={() => {
            setTextNodeShapes([
              ...textNodeShapes,
              {
                id: `${textNodeShapes.length + 1}`,
                text: "xxx",
                x: 100,
                y: 100,
                width: 100,
                height: 100,
                stroke: "#ddd",
                fill: "#555",
                draggable: true,
              },
            ])
          }}
        >+</button>
      </aside>
    </div>
  );
}
