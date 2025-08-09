import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export let UserContext = createContext();

export function UserContextProvider(props) {
  let [user, setUser] = useState(null);
  async function GetUserData() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message == "success") {
      setUser(data.user);
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("token")) {
      GetUserData();
    }
  })
  return (
    <UserContext.Provider value={{ GetUserData , user , setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
