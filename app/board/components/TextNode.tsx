"use client"
import { useRef, useEffect } from "react";
import { Rect, Text, Group, Transformer } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";

export type TextNodeShape = {
  id: string
  text: string
  x: number
  y: number
  width: number
  height: number
  stroke: string
  fill: string
  draggable?: boolean
}

type Props = {
  shape: TextNodeShape,
  onChange: (shape: TextNodeShape) => void,
  onClick?: (shape: TextNodeShape) => void,
  isSelected: boolean,
}

export default function TextNode({ shape, onChange, onClick, isSelected = false }: Props) {
  const groupRef = useRef<GroupType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (isSelected) {
      if (!groupRef.current) return;
      trRef?.current?.nodes([groupRef.current])
    }
  }, [isSelected]);

  return (
    <>
      <Group
        ref={groupRef}
        x={shape.x} y={shape.y}
        width={shape.width} height={shape.height}
        draggable
        onClick={() => {
          onClick?.(shape)
        }}
        onDragEnd={(e) => {
          onChange({ ...shape, x: e.target.x(), y: e.target.y() })
        }}
        onMouseEnter={(e) => {
          const stage = e.target.getStage();
          if (stage) stage.container().style.cursor = 'pointer';
        }}
        onMouseLeave={(e) => {
          const stage = e.target.getStage();
          if (stage) stage.container().style.cursor = 'default';
        }}
        onTransformEnd={() => {
          const node = groupRef.current
          if (!node) return
          
          // リサイズによる位置とサイズの変更を通知
          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          })
          // スケールを戻す
          node.scaleX(1)
          node.scaleY(1)
        }}
      >
        <Rect width={shape.width} height={shape.height} stroke={shape.stroke} strokeWidth={1} strokeScaleEnabled={false} fill={shape.fill} cornerRadius={5} />
        <Text width={shape.width} height={shape.height} fill={shape.stroke} text={`id: ${shape.id}\nx: ${shape.x.toFixed()}\ny: ${shape.y.toFixed()}\nwidth: ${shape.width.toFixed()}\nheight: ${shape.height.toFixed()}\n${shape.text}`} verticalAlign="middle" align="center" />
      </Group>
      {isSelected && (
        <Transformer ref={trRef} keepRatio={false} ignoreStroke={true} rotateEnabled={false} />
      )}
    </>
  )
}
