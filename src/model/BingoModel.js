class BingoModel {
  constructor(cardData = {}, playCardToken = "", winStatus = 0) {
    this.cardData = cardData;
    this.playCardToken = playCardToken;
    this.winStatus = winStatus;
  }

  static fromApiResponse(cardData, playCardToken, winStatus) {
    console.log("Card Data", cardData);
    console.log("Play Card Token", playCardToken);
    console.log("Win Status sss", winStatus);
    return new BingoModel(cardData, playCardToken, winStatus);
  }
}

export default BingoModel;
