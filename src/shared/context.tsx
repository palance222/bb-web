import { createContext, useState, useContext } from "react";

const initialState = {
  loading: false,
  token: "",
  error: "",
  success: "",
  secure: "",
  pwd: "",
  clientId: "",
};

const config = {
  API_URL: "https://pa0ykzslfh.execute-api.ap-southeast-1.amazonaws.com/",
};

const MyContext = createContext<any>(initialState);

export const Provider = ({ children }: any) => {
  const [state, setState] = useState<any>(initialState);

  const saveToken = async (auth: any) => {
    try {
      const response = await fetch(config.API_URL + "auth/login", {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: auth.username,

          password: auth.password,
        }),
      });

      const responseJson = await response.json();

      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const saveMFA = async (auth: any) => {
    try {
      const response = await fetch(config.API_URL + "auth/password/mfa", {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: auth.username,

          code: auth.code,

          hash: auth.hash,

          session: auth.session,
        }),
      });

      const responseJson = await response.json();

      console.log(responseJson);

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const listAccounts = async (type: any, clientId: any) => {
    try {
      const response = await fetch(config.API_URL + type + "/account/list", {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: clientId,
        }),
      });

      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const findClient = async (clientId: string) => {
    try {
      const response = await fetch(
        config.API_URL + "/client/find/detail?id=" + clientId,

        {
          method: "GET",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        state,
        setState,
        saveToken,
        saveMFA,
        findClient,
        listAccounts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

/**

*  Context initialisation

*/

export function Context() {
  const context = useContext(MyContext);

  // if (!context) {

  //   throw new Error('useAuth must be used within an AuthProvider');

  // }

  return context;
}
