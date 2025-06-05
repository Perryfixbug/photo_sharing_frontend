import { Button } from "@mui/material";
import React from "react";
import {
  Paper,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { postAPI } from "../../lib/restfullAPI";
import { getCookie } from "../../lib/cookie";

const UploadPhoto = ({ onUploadPhoto }) => {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic for submitting the form
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", getCookie("userId"));
    try {
      const photo = await postAPI("photo", formData);
      onUploadPhoto(photo); // Call the callback function to update the photo list
      setPreview(null);
      setFile(null);
    } catch (e) {
      console.error("Error uploading photo:", e);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };
  return (
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: 400, mt: 4, mx: "auto", textAlign: "center" }}
    >
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Choose Image
        <input type="file" hidden accept="image/*" onChange={handleChange} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!file}
      >
        Upload
      </Button>
      {preview && (
        <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
          <Avatar
            variant="rounded"
            src={preview}
            alt="preview"
            sx={{ width: "100%", height: "auto", borderRadius: 2 }}
          />

          <IconButton
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default UploadPhoto;
