import {createContext, useState, useContext} from 'react';

const initialState = {
    loading: false,
    token: '',
    error: '',
    success: '',
    secure: '',
    pwd: '',
    clientId: ''
};

type StateData = {
    loading: boolean,
    token: string,
    error: string,
    success: string,
    secure: any,
    pwd: string,
    clientId: string
  };

interface ContextProps {
    state: StateData | null;
    readonly setState: (state: StateData) => void;
    readonly saveToken: (auth: any) => Promise<void>;
}

const config = {
  API_URL: 'https://pa0ykzslfh.execute-api.ap-southeast-1.amazonaws.com/',
}
  
const MyContext = createContext<any>({
    state: null,
    setState: () => null,
    saveToken: async () => {},
  });

export const Provider = ({ children }: any) => {
    const [state, setState] = useState<any>(initialState);

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
            state,
            setState,
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
