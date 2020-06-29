import React, { useEffect } from "react";

import { Grid, Card, Divider, Button, Fab } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Person, AlternateEmail, Delete, Edit} from "@material-ui/icons";
import { useStyles } from "./UsersStyles";
import { User } from "../../model/User";
import { addFotoForUser } from "../../api/UsersApi";
import { Auth } from "aws-amplify";



export interface UsersGridProps {
  workers: User[],
  handleDeleteUser: (value:User) => void,
  handleEditUser: (value:User) => void,
  reload: () => void
}


const UsersGrid: React.FC<UsersGridProps> = (props) => {
  const classes = useStyles();
  const [user, setUser] = React.useState({} as unknown as User);
  const [currentUser, setCurrentUser] = React.useState('');

  useEffect(() => {
    const callAsync = async () => {
      const userInfo = await Auth.currentUserInfo();
      setCurrentUser(userInfo.username);
    }
    callAsync();
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const selectedFile = event.target.files[0];
      const result = await addFotoForUser(user, selectedFile)
      if(result) {
        props.reload();
      }
    }
  }

  return (
    <Grid container direction="row" style={{ flex: 75 }}>
      {props.workers.map((value, index) => (
        <Card key={value.username} className={value.customrole === 'Office' ? classes.paperOffice : classes.paperWorker}>
          <Grid container direction="column" style={{height: '100%'}}>
            <Grid container direction="row" style={{ flex: 80 }}>
              <Grid container direction="column" style={{ flex: 30 }}>
                <Grid item className={classes.foto}>
                  {value.customimageUrl ? (
                    <img alt={value.username} style={{ maxWidth: "120px", height: 'auto', imageOrientation: "from-image" }}
                      src={value.customimageUrl}
                    />
                  ) : (
                    <Skeleton variant="rect" width={120} height={150} />
                  )}
                  <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => handleFileUpload(e)} />
                  <label htmlFor="icon-button-file">
                    <Fab size="small" color="secondary" aria-label="add-foto" component="span" className={classes.fotoIcon}
                          onClick={() => { setUser(value)}}>
                      <Edit />
                    </Fab>
                  </label>
                </Grid>
              </Grid>
              <Grid container direction="column" style={{ flex: 70 }} alignItems="flex-start">
                <Grid item className={classes.itemCenter}>
                  <p><b>{value.username}</b></p>
                </Grid>
                <Divider />
                <Grid item className={classes.itemIcon}>
                  <Person />
                  <p>{value.given_name} {value.family_name}</p>
                </Grid>
                <Grid item className={classes.itemIcon}>
                  <AlternateEmail />
                  <p>{value.email}</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="space-around" style={{ flex: 20 }} alignContent="center">
              <Grid item>
                <Button
                  id="edit"
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Delete />}
                  disabled={value.username === currentUser}
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
          </Grid>
        </Card>
      ))}
    </Grid>
  )
}

export default UsersGrid;
