import { useNavigate } from "react-router-dom";

const Logout = async () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(
      "http://localhost:8989/trivia-api/v1/auth/signout",
      {
        method: "POST",
        headers,
      }
    );

    await response.json();

    if (response.ok) {
      localStorage.removeItem("token");
      navigate("home");
    }
  } catch (error) {
    console.error("Error", error);
    localStorage.removeItem("token");
    navigate("home");
  }
};

export default Logout;
