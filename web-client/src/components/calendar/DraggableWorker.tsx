 import React, { FunctionComponent } from "react"
import { Chip } from "@material-ui/core";
import { ItemTypes } from "../../utils/ItemTypes";
import { useDrag } from "react-dnd";

export interface DraggableWorkerProps {
  id:number,
  name:string,
  type:string
}

export const DraggableWorker: FunctionComponent<DraggableWorkerProps> = ({id, name, type}) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type, id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  return (
    <Chip ref={drag} variant="outlined" color="primary" label={name} />
  );

}