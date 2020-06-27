import React from "react";

import { Grid, Card, Divider, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Person, AlternateEmail, PhoneAndroid, Delete, Edit } from "@material-ui/icons";
import { useStyles } from "./UsersStyles";
import { User } from "../../model/User";


export interface UsersGridProps {
  workers: User[],
  handleDeleteUser: (value:User) => void,
  handleEditUser: (value:User) => void
}

const UsersGrid: React.FC<UsersGridProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" style={{ flex: 75 }}>
      {props.workers.map((value) => (
        <Card key={value.username} className={value.customrole === 'Office' ? classes.paperOffice : classes.paperWorker}>
          <Grid container direction="row" style={{ flex: 80 }}>
            <Grid container direction="column" style={{ flex: 30 }}>
              <Grid item>
                {value.customimageUrl ? (
                  <img style={{ maxWidth: "100px", imageOrientation: "from-image" }}
                    src={value.customimageUrl}
                  />
                ) : (
                    <Skeleton variant="rect" width={120} height={150} />
                  )}
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ flex: 70 }}>
              <Grid item>
                <p>{value.username}</p>
              </Grid>
              <Divider />
              <Grid item>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Person />
                  <p>{value.given_name} {value.family_name}</p>
                </div>
              </Grid>
              <Grid item>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <AlternateEmail />
                  <p>{value.email}</p>
                </div>
              </Grid>
              <Grid item>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <PhoneAndroid />
                  <p>{value.phone_number}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center" style={{ flex: 20 }} alignContent="flex-end">
            <Grid item>
              <Button
                id="edit"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Delete />}
                onClick={() => props.handleDeleteUser(value)}>
                Delete
                  </Button>
            </Grid>
            <Grid item>
              <Button
                id="delete"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Edit />}
                onClick={() => props.handleEditUser(value)}>
                Edit
                  </Button>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  )
}

export default UsersGrid;