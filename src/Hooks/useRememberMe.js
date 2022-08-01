export const useRememberMe = (checkedState, authData) => {
  const saveToLocal = () => {
    let localData = JSON.parse(localStorage.getItem("rememberMe"));
    if (checkedState == true) {
      localStorage.setItem(
        "rememberMe",
        JSON.stringify({
          username: authData.username,
          password: authData.password,
        })
      );
    } else if (checkedState == false && localData) {
      localStorage.removeItem("rememberMe");
    }
  };
  return { saveToLocal };
};
