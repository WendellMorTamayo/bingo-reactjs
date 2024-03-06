import { useEffect, useState } from "react";
import useBingo from "./hooks/useBingo";
import JoinGameCard from "./components/JoinGameCard";
import Button from "@mui/material/Button";
import BingoCard from "./components/BingoCard";
import { Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [gameCode, setGameCode] = useState("");
  const [winningCard, setWinningCard] = useState([]);
  const {
    bingoCards,
    loading,
    getGameData,
    codeExists,
    checkCodeExists,
    checkIfCardWins,
  } = useBingo();

  const handleGetCardData = () => {
    getGameData(gameCode).then((r) => console.log(r));
  };

  useEffect(() => {
    console.log("gameCode", gameCode);
  }, [gameCode]);

  const EnterGameCode = () => (
    <div className="w-[450px] text-center justify-center items-center self-center flex">
      <JoinGameCard
        setGameCode={setGameCode}
        getGameData={checkCodeExists}
        codeExists={codeExists}
      />
    </div>
  );

  useEffect(() => {
    checkCodeExists(gameCode).then((r) => console.log(r));
  }, [gameCode]);

  return (
    <Grid
      container
      spacing={0}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      aria-label={"main container"}
      sx={{
        width: "100%",
        height: "100%",
        marginY: 2,
      }}
    >
      {!codeExists && <EnterGameCode />}

      {codeExists && (
        <Box width={800} flexDirection={"row"}>
          <Grid
            container={true}
            spacing={1}
            direction={"row-reverse"}
            sx={{ backgroundColor: "white", paddingLeft: 2 }}
          >
            <div className={"absolute left-0"}>
              <h1>Game Code: {gameCode}</h1>
            </div>
            <Grid item lg={2}>
              <div className="w-full justify-center text-center flex">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => setGameCode("")}
                  className={"w-full justify-center text-center flex mx-2"}
                >
                  Exit
                </Button>
              </div>
            </Grid>
            <Grid item lg={2}>
              <div className="w-full justify-center text-center flex">
                <Button
                  variant="contained"
                  onClick={handleGetCardData}
                  className={"w-full justify-center text-center flex mx-2"}
                >
                  Get Card
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction={"row"}
            sx={{ backgroundColor: "white", paddingLeft: 2 }}
          >
            {loading ? (
              <p>Empty...</p>
            ) : (
              bingoCards.map((card, index) => (
                <Grid item xs={4} key={index}>
                  <p>Status: {card.winStatus}</p>
                  <p>Token: {card.playCardToken}</p>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => checkIfCardWins(card.playCardToken)}
                    className={"w-full justify-center text-center flex mx-2"}
                  >
                    Check Win Status
                  </Button>

                  <BingoCard
                    cardData={card.cardData}
                    checkCard={checkIfCardWins}
                    token={card.playCardToken}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default App;
