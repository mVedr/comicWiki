"use client";
import axios from "axios";

const useCheckResp = async (comicId) => {
  const currId = parseInt(localStorage.getItem("currId"));
  console.log("currId: " + currId);
  let val = 0;

  try {
    const [adminRes, modRes] = await Promise.all([
      axios.get(`http://localhost:8000/admin/${currId}`),
      axios.get(`http://localhost:8000/mod/${currId}`),
    ]);

    const aA = adminRes.data;
    const mA = modRes.data;

    console.log("Admin Data:", aA);
    console.log("Mod Data:", mA);

    aA.forEach((element) => {
      if (element.id === comicId) {
        console.log("Admin hit ", comicId);
        val = 2;
      }
    });

    mA.forEach((element) => {
      if (element.id === comicId) {
        console.log("Mod hit ", comicId);
        val = 1;
      }
    });

    console.log("final ", val);
    return val;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return val; 
  }
};

export default useCheckResp;
