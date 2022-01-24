function sameArrayCheck(arr, ele) {
    // console.log('=>', arr)
  
    if (ele > 0 && ele != 0) {
      for (let i = 0; i < arr.length; i++) {
        var checkSameArr = [];
  
        for (let j = i; j < ele; j++) {
          checkSameArr.push(arr[j]);
        }
        ele++;
  
        if (!checkSameArr.includes(null)) {
          let s = new Set(checkSameArr);
  
          if ((s.size == 1) == true) {
            return [true, checkSameArr[0]];
          }
        }
      }
  
      return false;
    } else {
      let s = new Set(arr);
      return s.size == 1;
    }
  }
  
  export function calculateCustomWinner(size, boxes, customWin) {
    let count = 0;
    let twoDimensionalArray = [];
  
    // horizontal array
  
    let horizontalArray = [];
  
    for (let i = 0; i < size; i++) {
      var horizontalData = [];
      var horizontalBoxEle = [];
  
      for (let j = 0; j < size; j++) {
        horizontalData.push(count);
        horizontalBoxEle.push(boxes[count]);
        count++;
      }
  
      let horizontalWinner = sameArrayCheck(horizontalBoxEle, customWin);
  
      if (horizontalWinner[0]) {
        return horizontalWinner[1];
      }
  
      twoDimensionalArray.push(horizontalData);
      horizontalArray.push(horizontalData);
    }
  
    // vertical array
  
    for (let j = 0; j < size; j++) {
      var verticalData = [];
      var verticalBoxEle = [];
  
      for (let i = 0; i < count; i++) {
        if (i % size == j) {
          verticalData.push(i);
          verticalBoxEle.push(boxes[i]);
        }
      }
  
      let verticalWinner = sameArrayCheck(verticalBoxEle, customWin);
  
      if (verticalWinner[0]) {
        return verticalWinner[1];
      }
     
  
      twoDimensionalArray.push(verticalData);
    }
  
    // diagonal array
  
    let diagonalOne = [];
    let diagonalTwo = [];
  
    let diagonalOneEle = [];
    let diagonalTwoEle = [];
  
    for (let i = 0; i < horizontalArray.length; i++) {
      diagonalOne.push(horizontalArray[i][i]);
      diagonalOneEle.push(boxes[horizontalArray[i][i]]);
  
      diagonalTwo.push(horizontalArray[i][horizontalArray.length - i - 1]);
      diagonalTwoEle.push(
        boxes[horizontalArray[i][horizontalArray.length - i - 1]]
      );
    }
  
    let diagonalOneWinner = sameArrayCheck(diagonalOneEle, customWin);
    if (diagonalOneWinner[0]) {
      return diagonalOneWinner[1];
    }
  
    let diagonalTwoWinner = sameArrayCheck(diagonalTwoEle, customWin);
    if (diagonalTwoWinner[0]) {
      //   return ('winnerD2 ' + diagonalTwoWinner[1])
      return  diagonalTwoWinner[1];
    }
  
    twoDimensionalArray.push(diagonalOne);
    twoDimensionalArray.push(diagonalTwo);
  
    if (!boxes.includes(null)) {
      return "Draw";
    }
  
    return null;
  }
  