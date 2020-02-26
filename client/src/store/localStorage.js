export const loadState = () => {
  console.log('loadState activated');
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      var currentState = JSON.parse(serializedState);
      const { lastTimestamp, expiresIn } = currentState;
      const tenMinutes = 600000;
      const cautiousThreshold = Number(expiresIn) * 1000 - tenMinutes;
      if (new Date().getTime() - lastTimestamp <= cautiousThreshold) {
        console.log('it has been 50 minutes or less');
        getNewTokenAndUpdate(currentState, cautiousThreshold).then(result => {
          console.log('it worked');
          console.log(JSON.parse(localStorage.getItem('state')));
          return JSON.parse(localStorage.getItem('state')); // returns new state
        });
      } else {
        console.log('it has been more than 50 minutes');
        return undefined;
      }
      // console.log('area touched');
      // return JSON.parse(serializedState);
      //return JSON.parse(serializedState);
    } catch (err) {
      console.log('area touched');
      return undefined;
    }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    throw new Error(error);
  }
  // refreshStateInterval(state);
  console.log('someone was trying to save something');
};

export const removeState = () => {
  try {
    localStorage.removeItem('state');
  } catch (error) {
    // ignore for now
  }
};

export const refreshStateInterval = currentState => {
  const tenMinutes = 600000;
  const cautiousThreshold = Number(currentState.expiresIn) * 1000 - tenMinutes;
  // setInterval(function() {
  //   getNewToken(currentState.accessToken)
  //     .then(res => res.json())
  //     .then(end => console.log(end));
  //   // console.log('asdasdasdasd');
  // }, cautiousThreshold);
  setInterval(function() {
    getNewTokenAndUpdate(currentState);
  }, cautiousThreshold);
};

export const createStateObj = searchParameters => {
  var localStorageObj = { lastTimestamp: new Date().getTime() };
  searchParameters.forEach((value, key) => (localStorageObj[key] = value));
  return localStorageObj;
};

// export const getNewToken = accessToken => {
//   return fetch(`http://localhost:3001/refresh?accessToken=${accessToken}`, {
//     method: 'POST'
//   });
// };

export const getNewTokenAndUpdate = currentState => {
  return new Promise((resolve, reject) => {
    console.log('triggered');
    console.log(currentState);
    fetch(
      `http://localhost:3001/refresh?accessToken=${currentState.accessToken}`,
      {
        method: 'POST'
      }
    )
      .then(res => res.json())
      .then(result => {
        console.log('result is ' + result.accessToken);
        currentState.accessToken = result.accessToken;
        currentState.expiresIn = result.expiresIn;
        console.log(currentState);
        saveState(currentState);
        resolve();
      });
  });
};
