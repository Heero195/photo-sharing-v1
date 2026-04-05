import React, { useState, useEffect } from "react";
import { Typography, Card, CardMedia, CardContent, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const data = await fetchModel(`/photosOfUser/${userId}`);
      setPhotos(data);
    };
    loadPhotos();
  }, [userId]);

  if (!photos) {
    return <Typography variant="body1">Loading photos...</Typography>;
  }

  if (photos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-photos-container">
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt={`Photo ${photo.file_name}`}
            className="photo-image"
          />
          <CardContent>
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              Posted on: {formatDate(photo.date_time)}
            </Typography>
            
            <Typography variant="subtitle1" className="comments-header">
              Comments
            </Typography>
            <Divider />
            
            {photo.comments && photo.comments.length > 0 ? (
              <List className="comments-list">
                {photo.comments.map((comment) => (
                  <ListItem key={comment._id} alignItems="flex-start" className="comment-item">
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          <Link to={`/users/${comment.user._id}`} className="comment-user-link">
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>
                          {" - "}
                          <span className="comment-date">
                            {formatDate(comment.date_time)}
                          </span>
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" color="textPrimary" className="comment-text">
                          {comment.comment}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" className="no-comments">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
