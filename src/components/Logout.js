const Logout = async () => {
  try {
    const response = await fetch(
      "http://localhost:8989/trivia-api/v1/auth/signout"
    );

    if (response.ok) {
      // signOut(auth).then(() => {
      //   // Sign-out successful.
      // }).catch((error) => {
      //   // An error happened.
      // });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return window.location.href = "/home";
    }
  } catch (error) {
    console.error("Error", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return window.location.href = "/home";
  }
};

export default Logout;
