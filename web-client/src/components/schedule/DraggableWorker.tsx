import React, { FunctionComponent, useState } from "react"
import { Chip } from "@material-ui/core";
import { useDrag } from "react-dnd";
import { PlaningDay } from "../../model/Calendar";
import { v4 as uuid } from 'uuid';

export interface DraggableWorkerProps {
  name:string,
  type:string,
  isDropped:boolean,
  onDelete?:(day:PlaningDay) => void
}


export const DraggableWorker: FunctionComponent<DraggableWorkerProps> = ({name, type, isDropped, onDelete}) => {

  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  if(isDropped) {
    return (
      <Chip key={uuid()} ref={drag}
          variant="outlined"
          color="primary"
          size="small"
          label={name}
          onDelete={onDelete} />
    )
  } else {
    return (
      <Chip ref={drag} key={uuid()}
        variant="outlined"
        color="primary"
        size="small"
        label={name} />
    )
  }

}