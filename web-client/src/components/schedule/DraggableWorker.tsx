import React, { FunctionComponent } from "react"
import { Chip } from "@material-ui/core";
import { useDrag } from "react-dnd";

export interface DraggableWorkerProps {
  name:string,
  type:string,
  isDropped:boolean,
  isEditable:boolean,
  onDelete?:(name:string) => void
}

const dragStyle: React.CSSProperties = {
  cursor: 'move',
  width: '90px'
}
const margin: React.CSSProperties = {
  marginBottom: '2px'
}

export const DraggableWorker: React.FC<DraggableWorkerProps> = ({name, type, isDropped, isEditable, onDelete}) => {

  const [{}, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  if(isDropped && isEditable) {
    return (
      <div style={margin}>
        <Chip ref={drag}
            variant="outlined"
            color="primary"
            size="small"
            label={name}
            onDelete={onDelete}
            style={dragStyle} />
      </div>
    )
  } else if(isDropped && !isEditable) {
    return (
      <div style={margin}>
        <Chip
          variant="outlined"
          color="primary"
          size="small"
          label={name}
        />
      </div>
    )
  } else {
    return (
      <div style={margin}>
        <Chip ref={drag}
          variant="outlined"
          color="primary"
          size="small"
          label={name}
          style={dragStyle} />
      </div>
    )
  }

}