function checkCashRegister(price, cash, cid) {
    const registerMoneyVals = [cid[8][1], cid[7][1], cid[6][1], cid[5][1], cid[4][1], cid[3][1], cid[2][1],
                              cid[1][1], cid[0][1]];
    const moneyVals = [['ONE HUNDRED', 100], ['TWENTY', 20], ['TEN', 10], ['FIVE', 5], ['ONE', 1], 
                        ['QUARTER', 0.25], ['DIME', 0.1], ['NICKEL', 0.05], 
                        ['PENNY', 0.01]];                         
    const drawStatus = {
      status: '',
      change: []
    };
    const change = cash - price;
  
    //function to check total of register
    function checkTotal(register){
      let total = 0;
      for (let i = 0; i < register.length; i++){
        total += register[i][1];
      }
      return total;
    }
  
    //function for change
    function changeCheck(change, moneyVals, draw){
      const amount = [];
      let billsReq = 0;
      //cycle through moneyvalues until find a bill can give for change
      for (let i = 0; i < moneyVals.length; i++){
        const currentBill = moneyVals[i][0];
        const billValue = moneyVals[i][1];
        const maxBills = draw[i] / moneyVals[i][1]
        const billsInDraw = draw[i] / billValue;
        //billvalue <= change, found an amount can give as change
        if (billValue <= change){
          billsReq = Math.floor(change / billValue);
            //if number of bills required is more than amount in draw use as many bills as possible
            if (billsReq > billsInDraw){
                amount.push([currentBill, billValue * maxBills]);
                change = (change - billValue * maxBills).toFixed(2);
            //have correct amount of bills
            }  else if (billsReq < billsInDraw){
                amount.push([currentBill, billValue * billsReq]);
                change = (change - billValue * billsReq).toFixed(2);
            }
        }
      }
      //turn change into integer to check value
      //if change to be given is more than 0 didn't have correct bills to give change
      change = parseFloat(change);
      if (change === 0){
        return amount;
      } else {
        return [];
      }
    }
  
    let drawTotal = checkTotal(cid);
  
    //change is more than what is in draw
    if (change > drawTotal){
      drawStatus.status = 'INSUFFICIENT_FUNDS';
      console.log(drawStatus);
      return drawStatus;
    }
    //change is exactly amount in draw
    if (change === drawTotal){
      drawStatus.status = 'CLOSED';
      drawStatus.change = cid;
      console.log(drawStatus);
      return drawStatus;
    }
    //change is less than amount in draw
    if (change <= drawTotal){
      drawStatus.status = 'OPEN';
      drawStatus.change = changeCheck(change, moneyVals, registerMoneyVals);
      //if change couldnt be made with bills in draw
      if (drawStatus.change.length === 0){
        drawStatus.status = 'INSUFFICIENT_FUNDS'
      } 
      console.log(drawStatus);
      return drawStatus;
    }
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);