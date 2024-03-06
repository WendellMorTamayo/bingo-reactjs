import React, { useState, useEffect } from "react";
import axios from "axios";
import BingoModel from "../model/BingoModel";

function UseBingo() {
  const [bingoCards, setBingoCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codeExists, setCodeExists] = useState(false);
  const [winStatus, setWinStatus] = useState(0);

  const getGameData = async (gameCode) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://www.hyeumine.com/getcard.php?bcode=${gameCode}`,
      );
      await checkIfCardWins(response.data["playcard_token"]);

      const newBingoCard = BingoModel.fromApiResponse(
        response.data["card"],
        response.data["playcard_token"],
        winStatus,
      );

      setBingoCards((prevCards) => [...prevCards, newBingoCard]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const checkCodeExists = async (gameCode) => {
    setLoading(true);
    try {
      await axios
        .get(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`)
        .then((res) => {
          const codeExists = parseInt(res.data) !== 0;
          setCodeExists(codeExists);
          setLoading(false);
          return codeExists;
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const checkIfCardWins = async (playCardToken) => {
    setLoading(true);
    try {
      await axios
        .get(
          `http://www.hyeumine.com/checkwin.php?playcard_token=${playCardToken}`,
        )
        .then((res) => {
          console.log("Check Win", res.data);
          setLoading(false);
          setWinStatus(parseInt(res.data));
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("TRUE OR FALSE", codeExists);
  }, [codeExists]);

  return {
    bingoCards,
    loading,
    getGameData,
    codeExists,
    checkCodeExists,
    checkIfCardWins,
  };
}

export default UseBingo;
