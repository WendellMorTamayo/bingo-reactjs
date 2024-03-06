import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const JoinGameCard = ({ setGameCode, getGameData, codeExists }) => {
  const [textInput, setTextInput] = useState("");
  const [code, setCode] = useState("");

  const handleJoinGame = async () => {
    console.log("Joining game with code:", textInput);
    await getGameData(textInput);

    await new Promise((resolve) => setTimeout(resolve, 250));

    setGameCode(textInput);
    if (codeExists) {
      console.log("Joined game with code:", textInput);
    } else {
      console.log("Game code does not exist", codeExists);
    }
  };

  return (
    <Box sx={{ minWidth: 350 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            Enter the game code
          </Typography>
          <TextField
            size={"small"}
            fullWidth
            id="fullWidth"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </CardContent>
        <CardActions className={"justify-center flex items-center p-20"}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            sx={{ py: 1, mb: 1.5, mt: -1 }}
            onClick={handleJoinGame}
          >
            Join Game
          </Button>
        </CardActions>
        {textInput !== "" && !codeExists && (
          <Typography sx={{ mt: -1.5, mb: 1.5 }} color="red">
            Game code does not exist
          </Typography>
        )}
      </Card>
    </Box>
  );
};
export default JoinGameCard;
