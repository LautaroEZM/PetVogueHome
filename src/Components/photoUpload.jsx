import { MuiFileInput } from "mui-file-input";
import { Container, CircularProgress } from "@mui/material";
import { useState } from "react";
import { storage } from "../FireBase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PhotoUpload({ photo, setPhoto }) {
  const [loading, setLoading] = useState(false);

  const handlePhoto = (file) => {
    if (photo) setPhoto(null);
    const name = Math.random().toString();
    const imageRef = ref(storage, `/${name}`);
    setLoading(true);
    uploadBytes(imageRef, file).then(() => {
      const uploadedImg = ref(storage, name);
      getDownloadURL(uploadedImg).then((url) => {
        setPhoto(url);
        setLoading(false);
      });
    });
  };

  return (
    <Container
      sx={{
        minWidth: 300,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {photo ? (
        <div>
          <img
            src={photo}
            style={{ maxWidth: 300, maxHeight: 300 }}
          />
        </div>
      ) : (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <h3>Please submit a photo</h3>
          )}
        </div>
      )}
      <MuiFileInput
        value={photo}
        onChange={handlePhoto}
        inputProps={{ accept: ".png, .jpeg" }}
        sx={{ color: "white", border: "1px solid white", width: '355px', mt: 2 }}
      />
    </Container>
  );
}
