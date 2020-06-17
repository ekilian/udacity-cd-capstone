import React, { FunctionComponent } from "react"
import { Chip } from "@material-ui/core";
import { useDrag } from "react-dnd";

export interface DraggableWorkerProps {
  name:string,
  type:string,
  isDropped:boolean,
  onDelete?:(name:string) => void
}


export const DraggableWorker: FunctionComponent<DraggableWorkerProps> = ({name, type, isDropped, onDelete}) => {

  const [{}, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  if(isDropped) {
    return (
      <Chip ref={drag}
          variant="outlined"
          color="primary"
          size="small"
          label={name}
          onDelete={onDelete} />
    )
  } else {
    return (
      <Chip ref={drag}
        variant="outlined"
        color="primary"
        size="small"
        label={name} />
    )
  }

}