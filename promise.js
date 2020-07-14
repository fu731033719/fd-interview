function all (promiseList) {
    return new Promise (resolve, reject) {
        let returnList = [];
        let errFlag = false
        let errList = [];
        let count = 0;
        for (let i = 0; i < promiseList.length; i++) {
            promiseList[i].then(res => {
                returnList[i] = res
                count++
            }).catch(err => {
                errFlag =  true;
                errList[i] = err;
            })
        }
        if (count === promiseList.length) {
            errFlag ? reject(errList) : resolve(returnList)
        }
    }
}
all([Promise1,Promise2,Promise3]).then(res => {
    // res
}).catch(err => {
    // err
})

function race (promiseAry) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseAry.length; i++) {
      promiseAry[i].then(resolve, reject)
    }
  })
}

race ([Promise1,Promise2,Promise3]).then(res => {
    // single promise res
}).catch(err => {
    // err
})