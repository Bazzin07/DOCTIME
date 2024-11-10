import { useRef, useEffect, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";  

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/; 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/; 
    
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [mpwd, setMpwd] = useState("");
  const [validMpwd, setValidMpwd] = useState(false);
  const [mpwdFocus, setMpwdFocus] = useState(false);

  const [errmsg, setErrmsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMpwd(pwd === mpwd);
  }, [pwd, mpwd]);

  useEffect(() => {
    setErrmsg("");
  }, [user, pwd, mpwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setErrmsg("Invalid Entry");
      return;
    }

    try {
      const response = await fetch('http://localhost:8001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pwd
        })
      });

      if (response.ok) {
        localStorage.setItem('username', user);
        navigate('/records'); 
      } else {
        const data = await response.json();
        setErrmsg(data.message || "Registration failed");
      }
    } catch (err) {
      setErrmsg("No Server Response");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-3xl md:text-5xl text-custombg font-bold">DOCTIME</h1>
      
      <section className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-custombg p-4 md:p-6 flex flex-col border rounded-2xl">
        <p
          ref={errRef}
          className={errmsg ? "bg-pink-100 text-red-600 font-bold p-2 mb-2 rounded text-sm md:text-base" : "sr-only"}
          aria-live="assertive"
        >
          {errmsg}
        </p>
        
        <h2 className="text-center text-white text-2xl md:text-3xl mb-4 md:mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Username:
              <span className={validName ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={userFocus && user && !validName ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must be 2 characters.<br />
              No numbers or special characters.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Password:
              <span className={validPwd ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must be 8 characters long.<br />
              Include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters: ! @ # $ %
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirm_pwd" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Confirm Password:
              <span className={validMpwd && mpwd ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMpwd || !mpwd ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span> 
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMpwd(e.target.value)}
              required
              aria-invalid={validMpwd ? "false" : "true"}
              aria-describedby="confirmnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setMpwdFocus(true)}
              onBlur={() => setMpwdFocus(false)}
            />
            <p
              id="confirmnote"
              className={mpwdFocus && !validMpwd ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must match the first password input field.
            </p>
          </div>

          <button
            disabled={!validName || !validPwd || !validMpwd}
            className="w-full md:w-1/3 bg-white text-custombg font-bold py-2 px-4 rounded-md mt-4 self-center
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-white font-semibold text-base md:text-lg">Already Registered?</p>
          <a 
            href="/signin" 
            className="text-white underline hover:text-gray-200 transition-colors text-base md:text-lg"
          >
            Sign In
          </a>
        </div>
      </section>
    </div>
  );
};

export default Login;