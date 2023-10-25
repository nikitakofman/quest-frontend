import styles from "../styles/Home.module.css";
import React from "react";
import { FontAwesomeIcon } from "../node_modules/@fortawesome/react-fontawesome/index";
import { faUser } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import { faInstagram } from "../node_modules/@fortawesome/free-brands-svg-icons/index";
import { faFacebook } from "../node_modules/@fortawesome/free-brands-svg-icons/index";
import { faCheck } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import { faXmark } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import Link from "../node_modules/next/link";
import { useEffect, useState } from "react";
import { loginUser, logoutUser } from "../reducers/users";
import { loginConcierge, logoutConcierge } from "../reducers/concierges";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const [login, setLogin] = useState(false);
  const [connected, setConnected] = useState(false);
  const [conciergeLogout, setConciergeLogout] = useState(false);

  const [clientLogout, setClientLogout] = useState(false);

  console.log(clientLogout);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.value);

  const concierge = useSelector((state) => state.concierges.value);

  useEffect(() => {
    console.log("header redux client", user);
    console.log("header redux concierge", concierge);

    if (user.token !== null) {
      console.log("this", "hhihoi");
    }

    if (concierge.token !== null) {
      setConciergeLogout(true);
    }

    if (user.token !== null) {
      setClientLogout(true);
    }

    // dispatch(
    //   loginUser({
    //     token: null,
    //     firstname: null,
    //     lastname: null,
    //     username: null,
    //   })
    // );
  }, []);

  const toggleLogin = () => {
    setLogin(!login);
  };

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signInEmailConcierge, setSignInEmailConcierge] = useState("");
  const [signInPasswordConcierge, setSignInPasswordConcierge] = useState("");

  const [signError, setSignError] = useState("");

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            loginUser({
              token: data.token,
              firstname: data.data.firstname,
              lastname: data.data.lastname,
              username: data.data.username,
              status: data.data.status,
              photo: data.data.photo,
            })
          );
          window.location.href = "/clientwelcome";
          setSignInEmail("");
          setSignInPassword("");
        } else {
          console.log(data.error);
          setSignError(data.error);
        }
      });
  };

  const handleConnectionConcierge = () => {
    fetch("http://localhost:3000/concierges/signinConcierge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmailConcierge,
        password: signInPasswordConcierge,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            loginConcierge({
              token: data.token,
              firstname: data.data.firstname,
              lastname: data.data.lastname,
              username: data.data.username,
              status: data.data.status,
              photo: data.data.photo,
            })
          );
          window.location.href = "/dashconcierge";
          setSignInEmailConcierge("");
          setSignInPasswordConcierge("");
        } else {
          console.log(data.error);
          setSignError(data.error);
        }
      });
  };

  const clearRedux = () => {
    dispatch(logoutConcierge());
    dispatch(logoutUser());
    setClientLogout(false);
    setConciergeLogout(false);
    window.location.href = "/";
  };

  return (
    <div className="flex-col flex justify-start">
      <div
        className={`fixed top-0 w-full flex flex-row justify-between pr-10 pl-10 pb-5 pt-5 mb-10 `}
        style={{ backgroundColor: "#33B49C" }}
      >
        <div className="flex flex-row">
          {clientLogout && (
            <Link href="/clientwelcome">
              <img
                src="/questlogowhite.png"
                className="h-10 mr-10 cursor-pointer"
              />
            </Link>
          )}
          {conciergeLogout && (
            <Link href="/dashconcierge">
              <img
                src="/questlogowhite.png"
                className="h-10 mr-10 cursor-pointer"
              />
            </Link>
          )}
          {!conciergeLogout && !clientLogout && (
            <Link href="/">
              <img
                src="/questlogowhite.png"
                className="h-10 mr-10 cursor-pointer"
              />
            </Link>
          )}

          {!conciergeLogout && !clientLogout ? (
            <div className="w-48 border-emerald-100 border-2 h-10 pt-2 pb-2 flex items-center justify-center rounded-2xl text-sm text-white bg-transparent hover:bg-opacity-50 hover:text-slate-200">
              <Link href="/conciergewelcome">Devenir concierge</Link>
            </div>
          ) : (
            <div className="w-48 border-black h-10  mr-10 pt-2 pb-2 flex items-center justify-center rounded-2xl text-sm text-black bg-neutral-200 hover:bg-neutral-300">
              {conciergeLogout && <Link href="/dashconcierge">Dashboard</Link>}
              {clientLogout && <Link href="/clientwelcome">Dashboard</Link>}
            </div>
          )}
        </div>
        {/* LOGINS START */}
        {login ? (
          <div className="flex flex-row w-9/12 items-center justify-end">
            <div className="text-red-500 mt-5 mb-5 h-full pt-16 pr-3">
              {signError}
            </div>
            <div className="w-4/12 p-4 flex flex-col items-center justify-start border-r-2 border-r-emerald-200 pr-14">
              <div className="text-white text-xl mb-3 mb-2">
                Connexion compte client
              </div>
              <input
                type="text"
                placeholder="E-mail"
                className="w-full border border-gray-300 rounded-md pb-2 pt-2 mb-3 pl-3"
                onChange={(e) => setSignInEmail(e.target.value)}
                value={signInEmail}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full border border-gray-300 rounded-md mb-4 pb-2 pt-2 mb-3 pl-3"
                onChange={(e) => setSignInPassword(e.target.value)}
                value={signInPassword}
              />
              <button
                className="w-full border-black pt-2 pb-2 flex items-center justify-center rounded-2xl text-sm text-white bg-neutral-800 hover:bg-neutral-600"
                onClick={handleConnection}
              >
                ENVOYER
              </button>
              <div style={{ marginBottom: "4mm" }}></div>
              <button className="w-full border-black pt-2 pb-2 flex items-center justify-center rounded-2xl text-sm text-white bg-neutral-800 hover:bg-neutral-600">
                Login avec Google
              </button>
              <p className="text-white mt-2 mb-2 text-center">ou</p>
              <p className="text-cyan-100 hover:text-cyan-300 text-center">
                <Link href="/clientsignuppage">Créez votre compte</Link>
              </p>
            </div>
            <div className="w-4/12 p-4 mb-4 flex flex-col items-center justify-start pl-14">
              <div className="text-white mb-2 text-xl mb-3 ">
                Connexion compte concierge
              </div>
              <input
                type="text"
                placeholder="E-mail"
                className="w-full border border-gray-300 rounded-md mb-2 pb-2 pt-2 mb-3 pl-3"
                onChange={(e) => setSignInEmailConcierge(e.target.value)}
                value={signInEmailConcierge}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full border border-gray-300 rounded-md mb-4 pb-2 pt-2 mb-3 pl-3"
                onChange={(e) => setSignInPasswordConcierge(e.target.value)}
                value={signInPasswordConcierge}
              />
              <button
                className="w-full border-black pt-2 pb-2 flex items-center justify-center rounded-2xl text-sm text-white bg-neutral-800 hover:bg-neutral-600"
                onClick={handleConnectionConcierge}
              >
                ENVOYER
              </button>
              <div className="text-white mt-5">ou</div>
              <button
                className="w-full pt-2 pb-2 flex items-center justify-center rounded-2xl text-cyan-100 hover:text-cyan-300"
                style={{ marginBottom: "4mm" }}
              >
                Devenir concierge
              </button>
            </div>
            <div
              onClick={toggleLogin}
              className="ml-10 flex justify-start h-full flex-row"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="h-6 text-slate-200 hover:text-slate-700 cursor-pointer flex items-start"
              />
            </div>
          </div>
        ) : !conciergeLogout && !clientLogout ? (
          <FontAwesomeIcon
            icon={faUser}
            onClick={toggleLogin}
            className="h-6 text-white cursor-pointer hover:text-slate-300"
          />
        ) : (
          <div className="flex flex-row items-center">
            <p
              className="mr-16 text-white font-semibold flex pr-3 hover:text-slate-200 cursor-pointer items-center"
              onClick={clearRedux}
            >
              Déconnexion
            </p>
            <div className="flex flex-row items-center cursor-pointer text-white hover:text-neutral-200">
              <p className="mr-3">
                {concierge.firstname}
                {user.firstname}
              </p>
              {conciergeLogout && (
                <img src={concierge.photo} className="h-10 rounded-xl" />
              )}
            </div>
          </div>
        )}
        {/* LOGINS END */}
      </div>
    </div>
  );
}

export default Header;
