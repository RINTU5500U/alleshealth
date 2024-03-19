import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { get_text } from '../http/apis';

function TextList() {
  const navigate = useNavigate();
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(texts);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get_text();
      console.log(data)
      setTexts(data.text);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Typography component="h1" variant="h5">
        Text List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ mt: 2 }}>
          {Array.isArray(texts) ? (
            texts.map((text) => (
              <Box
                key={text.id} // Provide a unique key to each Box component
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Typography variant="body1">{text.text}</Typography>
                <Typography variant="body2">{text.id}</Typography>
              </Box>
            ))
          ) : (
            <Box>
              {Object.values(texts).map((text) => (
                <Box
                  key={text.id} // Provide a unique key to each Box component
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body1">{text}</Typography>
                 
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TextList;