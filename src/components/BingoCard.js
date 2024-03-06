import React, { useEffect, useMemo, useState } from "react";
import { Grid, Paper, Box, Card } from "@mui/material";

const BINGO = ["B", "I", "N", "G", "O"];
const BingoCard = ({ cardData }) => {
  return (
    <Card sx={{ p: 1, width: 250, height: 300 }}>
      <Grid container>
        {BINGO.map((letter) => (
          <Grid key={letter} item xs={12 / 5}>
            <Paper
              variant="none"
              sx={{
                p: 1,
                textAlign: "center",
                backgroundColor: "lightgray",
                borderRadius: 0,
              }}
            >
              {letter}
            </Paper>
          </Grid>
        ))}
        <Grid container spacing={0}>
          {BINGO.map((letter) => (
            <Grid key={letter} item xs={12 / 5}>
              <Paper
                variant="outlined"
                sx={{
                  textAlign: "center",
                  borderRadius: 0,
                }}
              >
                {cardData[letter].map((number, index) => (
                  <Box key={index} sx={{ p: 1.4, borderWidth: 1 }}>
                    {Array.isArray(number) ? number[0] : number}
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

export default BingoCard;
