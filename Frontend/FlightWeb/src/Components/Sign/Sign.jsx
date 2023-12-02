import React, { useState, useCallback, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./signup.css"; // Make sure this path is correct
import { GoogleLoginButton } from "react-social-login-buttons";
import "./background.css";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpSignIn = () => {
  const [isGx, setIsGx] = useState(false);
  const [isTxr, setIsTxr] = useState(false);
  const [isHiddenC1, setIsHiddenC1] = useState(false);
  const [isHiddenC2, setIsHiddenC2] = useState(true);
  const [isTxlA, setIsTxlA] = useState(false);
  const [isTxlB, setIsTxlB] = useState(false);
  const [isZ200, setIsZ200] = useState(false);
  const [isSignIn, setIsSignIn] = useLocalStorage("isSignIn", false);
  const [username, setUsername] = useLocalStorage("username", "");
  const [email, setEmail] = useLocalStorage("email", "");
  /* This is for when the user tries to pay when not logged in*/
  const location = useLocation();
  const navigate = useNavigate();
  const redirectState = location.state;
  /* --------------------------------------- */

  const jumpToHome = useCallback(() => {
    // to jump to home page after login
    if (localStorage.getItem("isLoggedIn") === "true")
      window.location.href = "/";
    else alert("Please login first");
  }, []);
  {
    /*
      ======= Following code is for hanlding the submit of the form =======
  */
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const password1 = data.get("password1");
    const password2 = data.get("password2");

    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }

    // Adjusted body to match the required format
    const body = JSON.stringify({
      firstName: first_name,
      lastName: last_name,
      email,
      password: password1, // Changed from password1 to password
      membership: "Basic",
    });
    console.log(body);
    axios
      .post("http://localhost:8080/auth/signup", body, {
        headers: {
          "Content-Type": "application/json", // Ensure to set Content-Type for JSON
        },
      })
      .then((res) => {
        console.log(res);
        setIsSignIn(true);
        localStorage.setItem("isLoggedIn", true);
        console.log(res.data);
        localStorage.setItem("id", res.data.id);
        jumpToHome(); // Ensure `jumpToHome` is defined and performs the desired navigation
      })
      .catch((err) => {
        console.log(err);
        alert("User already exists");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password1");
    if (password === "" || !password) {
      alert("Please enter password");
      return;
    }

    const body = JSON.stringify({
      email: email,
      password: password,
    });
    console.log(body);
    axios
      .post("http://localhost:8080/auth/login", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setIsSignIn(true);
        localStorage.setItem("isLoggedIn", true);
        jumpToHome(); // Ensure `jumpToHome` is defined and performs the desired navigation
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid email or password");
      });
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;
      if (access_token) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
          );
          const body = JSON.stringify({
            email: response.data.email,
            is_google: true,
          });
          // axios.post("http://http://10.9.154.180:8000/login/", body, {
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // })
          // .then((res) => {
          //   console.log(res);
          //   setIsSignIn(true);
          //   setUsername(res.data.username); // Ensure `setUsername` is defined and working as expected
          //   setEmail(email); // Ensure `setEmail` is defined and working as expected
          //   jumpToHome(); // Ensure `jumpToHome` is defined and performs the desired navigation
          // }
          // )

          fetchAndStoreUserProfile(userId);
          jumpToHome();
        } catch (err) {
          console.error("Error fetching Google user info:", err);
        }
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const changeForm = () => {
    setIsGx(true);
    setTimeout(() => setIsGx(false), 1500);

    setIsTxr(!isTxr);
    setIsHiddenC1(!isHiddenC1);
    setIsHiddenC2(!isHiddenC2);
    setIsTxlA(!isTxlA);
    setIsTxlB(!isTxlB);
    setIsZ200(!isZ200);
  };
  function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        try {
          // Attempt to parse the stored value
          return JSON.parse(storedValue);
        } catch (e) {
          // If parsing fails, log the error and use the initial value
          console.error("Error parsing JSON from localStorage:", e);
          return initialValue;
        }
      } else {
        return initialValue;
      }
    });

    useEffect(() => {
      // Stringify the value when setting it in localStorage
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  }

  return (
    <div className="body-signup">
      <div class="x1">
        <div class="cloud"></div>
      </div>

      <div class="x2">
        <div class="cloud"></div>
      </div>

      <div class="x3">
        <div class="cloud"></div>
      </div>

      <div class="x4">
        <div class="cloud"></div>
      </div>

      <div class="x5">
        <div class="cloud"></div>
      </div>

      <div className="main">
        <div
          className={`container-signup a-container ${isTxlA ? "is-txl" : ""}`}
          id="a-container"
        >
          <form className="form" id="a-form" onSubmit={handleSignUp}>
            {" "}
            {/* Attached handleSignUp to the form's onSubmit event */}
            <h2 className="form_title title">Create Account</h2>
            <input
              className="form__input"
              type="text"
              placeholder="first_name"
              name="first_name"
            />
            <input
              className="form__input"
              type="text"
              placeholder="last_name"
              name="last_name"
            />
            <input
              className="form__input"
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              name="password1"
            />
            <input
              className="form__input"
              type="password"
              placeholder="Re-enter Password"
              name="password2"
            />
            <span className="form__span">
              By creating an account, you agree to our
              <a className="form__link" href="#terms">
                Terms & Privacy
              </a>
              .
            </span>
            <button
              className="form__button button switch-btn"
              type="submit"
              name="signup"
            >
              SIGN UP
            </button>
          </form>
        </div>
        <div
          className={`container-signup b-container ${isTxlB ? "is-txl" : ""} ${
            isZ200 ? "is-z200" : ""
          }`}
          id="b-container"
        >
          <form className="form" id="b-form" onSubmit={handleLogin}>
            <h2 className="form_title title">Sign in to Website</h2>
            <GoogleLoginButton
              className="GoogleButton"
              onClick={() => handleLoginGoogle()}
            />
            <span className="form__span">or use your email account</span>
            <input
              className="form__input"
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              name="password1"
            />
            <a className="form__link" href="#forgot-password">
              Forgot your password?
            </a>
            <button className="form__button button switch-btn" name="signin">
              SIGN IN
            </button>
          </form>
        </div>
        <div
          className={`switch ${isGx ? "is-gx" : ""} ${isTxr ? "is-txr" : ""}`}
          id="switch-cnt"
        >
          <div className={`switch__circle ${isTxr ? "is-txr" : ""}`}></div>
          <div
            className={`switch__circle switch__circle--t ${
              isTxr ? "is-txr" : ""
            }`}
          ></div>
          <div
            className={`switch__container ${isHiddenC1 ? "is-hidden" : ""}`}
            id="switch-c1"
          >
            <h2 className="switch__title title">Welcome Back!</h2>
            <p className="switch__description description">
              To keep connected with us please login with your personal info
            </p>
            <button
              className="switch__button button switch-btn"
              onClick={changeForm}
            >
              GO TO SIGN IN
            </button>
          </div>
          <div
            className={`switch__container ${isHiddenC2 ? "is-hidden" : ""}`}
            id="switch-c2"
          >
            <h2 className="switch__title title">Hello Friend!</h2>
            <p className="switch__description description">
              Enter your personal details and start journey with us
            </p>
            <button
              className="switch__button button switch-btn"
              onClick={changeForm}
            >
              GO TO SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSignIn;
