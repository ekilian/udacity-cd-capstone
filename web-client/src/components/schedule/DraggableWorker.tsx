import React from "react"
import { Chip } from "@material-ui/core";
import { useDrag } from "react-dnd";
import { User } from "../../model/User";

export interface DraggableWorkerProps {
  user:User,
  isDropped:boolean,
  isEditable:boolean,
  onDelete?:(name:string) => void
}

const dragStyle: React.CSSProperties = {
  cursor: 'move',
  width: '100%'
}
const margin: React.CSSProperties = {
  marginBottom: '2px'
}

const type = 'Worker'

export const DraggableWorker: React.FC<DraggableWorkerProps> = ({user, isDropped, isEditable, onDelete}) => {

  const [{}, drag] = useDrag({
    item: { user, type },
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
            label={`${user.given_name} ${user.family_name?.charAt(0)}.`}
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
          label={`${user.given_name} ${user.family_name?.charAt(0)}.`}
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
          label={`${user.given_name} ${user.family_name?.charAt(0)}.`}
          style={dragStyle} />
      </div>
    )
  }

}