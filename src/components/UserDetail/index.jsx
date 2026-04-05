import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Divider, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchModel(`/user/${userId}`);
      if (data) {
        setUser(data);
      }
    };
    loadUser();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading user data...</Typography>;
  }

  return (
    <Card className="user-detail-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Divider className="user-detail-divider" />
        <Typography variant="body1" className="user-detail-info">
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography variant="body1" className="user-detail-info">
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1" className="user-detail-info">
          <strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: user.description }} />
        </Typography>
        
        <div className="user-detail-actions">
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/photos/${user._id}`}
          >
            View Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
