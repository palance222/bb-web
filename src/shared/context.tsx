import {createContext, useState, PropsWithChildren, useContext} from 'react';

const initialState = {
    loading: false,
    token: '',
    error: '',
    secure: '',
    pwd: '',
    clientId: ''
};

type UserData = {
    loading: boolean,
    token: string,
    error: string,
    secure: string,
    pwd: string,
    clientId: string
  };

interface ContextProps {
    readonly userData: UserData | null;
    readonly setUserData: (userData: UserData) => void;
    readonly saveToken: (auth: any) => Promise<void>;
}

const config = {
  API_URL: 'https://pa0ykzslfh.execute-api.ap-southeast-1.amazonaws.com/',
}
  
const MyContext = createContext<ContextProps>({
    userData: null,
    setUserData: () => null,
    saveToken: async () => {},
  });

export const Provider = ({ children }: PropsWithChildren<{}>) => {
    const [userData, setUserData] = useState<UserData>(initialState);

    // Update AsyncStorage & context state
    const saveToken = async (auth:any) => {
    try {
        const response = await fetch(config.API_URL + 'auth/login', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: auth.username,
                password: auth.password,
            }),
        });
        const responseJson = await response.json();
        return responseJson;
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <MyContext.Provider value={{
            userData,
            setUserData,
            saveToken
        }}>
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
