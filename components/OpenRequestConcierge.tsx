// FETCH USEEFFECT EN GET QUI CHOPPE LES REQUESTS INFOS PUIS QUI LES METS DANS DES USESTATE

import styles from "../styles/Home.module.css";
import React from "react";
import { FontAwesomeIcon } from "../node_modules/@fortawesome/react-fontawesome/index";
import { faUser } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import { faEuroSign } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router"; // Importez le hook useRouter
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { faCommentDots } from "../node_modules/@fortawesome/free-solid-svg-icons/index";

function MyComponent() {
  const [instruction, setInstruction] = useState({});
  const [totalFees, setTotalFees] = useState({});

  useEffect(() => {
    // Utilisez l'ID pour faire votre requête
    fetch(`http://localhost:3000/request/requests`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInstruction(data); // Stocke les données dans le state
        setTotalFees(data); // Stocke les données dans le state
      })
      .catch((error) => {
        console.error("Une erreur s'est produite : ", error);
      });
  }, []); // Ajoutez id comme dépendance pour que l'effet se déclenche chaque fois que l'ID change

  // ...

  function useDeleteRequest() {
    if (request.status) {
      router.push("/Home"); // Utilisez router.push au lieu de window.location.href
    } else {
      router.push("/OpenRequest"); // Utilisez router.push au lieu de window.location.href
    }
  }
  // const [phoneNumber, setPhoneNumber] = useState([]);
  // console.log(phoneNumber[5].phoneNumber);
  // const [email, setEmail] = useState([]);
  // console.log(email[5].email);
  // const [serviceFees, setServiceFees] = useState();
  // const [productFees, setProductFees] = useState();

  // const calculateTotalCosts = () => {
  //   const valueServiceFees = serviceFees || 0;
  //   const valueProductFees = productFees || 0;
  //   const costsTotal = valueServiceFees + valueProductFees;
  //   return costsTotal;
  // }
  // function OpenRequest() {
  //   const [instruction, setInstruction] = useState({});
  //   console.log(instruction);
  //   const [totalFees, setTotalFees] = useState({});
  //   console.log(totalFees);
  //   // const [lastname, setLastname] = useState([]);
  //   // console.log(lastname[5].lastname);
  //   // const [firstname, setFirstname] = useState([]);
  //   // console.log(firstname[5].firstname);

  //   useEffect(() => {
  //     // Exemple de requête GET, assurez-vous de remplacer l'URL par votre propre endpoint
  //     fetch("http://localhost:3000/request/requests")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setInstruction(data); // Stocke les données dans le state
  //         setTotalFees(data); // Stocke les données dans le state
  //       })
  //       .catch((error) => {
  //         console.error("Une erreur s'est produite : ", error);
  //       });
  //   }, []);

  //   function DeleteRequest() {
  //     const request = useSelector((state) => state.request.status);
  //     useEffect(() => {
  //       if (request.status) {
  //         window.location.href = "/Home";
  //       } else {
  //         window.location.href = "/OpenRequest";
  //       }
  //     });
  //   }

  const requestinfo = useSelector((state) => state.openrequest.value);

  console.log("this", requestinfo);

  const [currentRequest, setCurrentRequest] = useState([]);

  console.log(currentRequest);

  const [id, setId] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/request/openRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: requestinfo.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentRequest(data.result);

        const last4 = data.result._id.slice(-4).toUpperCase();

        setId(last4);
      })
      .catch((error) => {
        console.error("Error fetching concierge:", error);
      });
  }, []);

  const parsedDate = new Date(currentRequest.date);

  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dayOfWeek = daysOfWeek[parsedDate.getDay()];
  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}
    >
      <Header />

      <h1 className="flex mt-12 text-xl bg-neutral-800 pl-20 pb-5 pt-6 text-neutral-300 w-full">
        <p>Votre requête</p>{" "}
        <p className="italic ml-1 text-white font-bold">#{id}</p>
      </h1>

      <div className="mt-10 flex mb-5 flex-row flex text-emerald-600 text-2xl font-semibold ml-5">
        <div className=" flex-col ml-16 w-5/12 h-full flex text-emerald-600 font-semibold font-light text-lg mb-3 font-semibold">
          <div className="flex items-center text-black ml-6">
            <FontAwesomeIcon icon={faCommentDots} className="mr-3" />
            <p> Communiquez avec {currentRequest.from}</p>
          </div>
          <div className="flex flex-col h-full ml-5 mt-5">
            <div className="flex flex-col align-top text-lg h-96 mb-8 border-2 w-full p-2 rounded-xl border-neutral-400">
              LIVE CHAT
            </div>
          </div>
          <div className="flex flex-col mt-5">
            {/* <iframe
              className="h-48 w-96 p-2 rounded-xl  "
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11537.773383415211!2d7.29766255!3d43.7013348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1698325376308!5m2!1sfr!2sfr"
            ></iframe> */}
          </div>
        </div>
        <div className="ml-15 flex-row flex w-5/12 text-emerald-600 text-2xl font-semibold ml-5">
          <div className="flex w-full flex-col">
            <h1 className=" ml-20 flex items-center flex-row justify-between font-light text-lg  font-semibold">
              <p>Instructions</p>{" "}
              <p className="flex text-sm text-black italic mr-6">
                Pour le: <p className="ml-1"> {formattedDate}</p>
              </p>
            </h1>
            <div className="flex flex-col text-black align-top text-lg w-10/12 h-40 mb-8 mt-5 ml-20 border-2 p-2 rounded-sm shadow-xl border-neutral-400">
              {currentRequest.instruction}
            </div>
            <div className="flex flex-col ml-20 text-lg text-black font-light">
              <p className="flex items-center">
                {" "}
                Frais pour dépenses:
                <p className="font-bold pl-1"> {currentRequest.productFees}€</p>
              </p>
              <p className="flex items-center">
                {" "}
                Votre commission:{" "}
                <p className="font-bold pl-1"> {currentRequest.serviceFees}€</p>
              </p>
              <p className="flex">
                Total payé par le client:{" "}
                <p className="font-bold pl-1"> {currentRequest.totalFees}€</p>
              </p>
            </div>

            <div className="flex flex-row justify-between w-full mt-5">
              <div className="">
                <div className="flex flex-col">
                  <h1 className="ml-20 flex flex-col font-light text-lg font-semibold">
                    Votre client
                  </h1>
                </div>
                <div className="flex flex-col ml-20 text-black">
                  {currentRequest.from}
                </div>
                <div className="flex flex-col ml-20 cursor-pointer mt-2">
                  <div className="flex flex-col items-center justify-center text-base text-sm text-center w-48 h-8 border-2 p-2 rounded-xl bg-black text-white hover:bg-neutral-700 border-neutral-400">
                    Appeler le client
                  </div>
                </div>
              </div>

              <div className="flex flex-col  mt-3 items-center">
                <button
                  className={`${styles.hovereffect} text-base flex cursor-pointer w-56 h-10 border-2 pl-5 pr-5 pt-2 pb-2 flex items-center justify-center rounded-2xl w-50 text-white`}
                  // onClick={useDeleteRequest}
                >
                  Terminer la requête
                </button>
                <button
                  className={`text-xs flex cursor-pointer w-full mt-2 bg-red-500 h-10 border-2 pl-5 pr-5 pt-2 pb-2 flex items-center justify-center rounded-2xl w-50 text-white`}
                  // onClick={useDeleteRequest}
                >
                  Signalez un problème
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyComponent;