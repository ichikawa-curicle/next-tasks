"use client"
import { useState } from "react";
import { Layer, Stage } from "react-konva";
import TextNode, { TextNodeShape } from "./TextNode"; 
import { KonvaEventObject } from "konva/lib/Node";

type Props = {
  size: { width: number, height: number },
  textNodeShapes: TextNodeShape[],
  setTextNodeShapes: (shapes: TextNodeShape[]) => void,
}

export default function Board({ size: { width, height }, textNodeShapes, setTextNodeShapes }: Props) {
  const [selectedNode, setSelectedNode] = useState<TextNodeShape | null>(null);

  const handleDeselect = (e: KonvaEventObject<MouseEvent|TouchEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedNode(null)
    }
  }

  return (
    <Stage
      width={width} height={height}
      onMouseDown={handleDeselect}
      onTouchStart={handleDeselect}
      draggable
    >
      <Layer>
        {
          textNodeShapes?.map((shape, index) => {
            return <TextNode
              key={shape.id}
              shape={shape}
              isSelected={selectedNode?.id === shape.id}
              onClick={(shape) => {
                setSelectedNode(shape)
              }}
              onChange={(newShape) => {
                const shapes = textNodeShapes.slice()
                shapes[shapes.findIndex(shape => shape.id === newShape.id)] = newShape
                setTextNodeShapes(shapes)
              }}
            />
          })
        }
      </Layer>
    </Stage>
  )
}
