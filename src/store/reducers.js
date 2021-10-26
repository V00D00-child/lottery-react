import { theme } from "../styles/theme";

export const initialState = {
  connection: null,
  network: null,
  networkId: null,
  account: null,
  scanner: null,
  walletEthBalance: null,
  lottery: null,
  manager: null,
  players: [],
  lastWinner: null,
  currentRound: null,
  poolBalance: null,
  message: '',
  isEntered: null,
  currentTheme: theme.dark,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.payload }
    case 'WEB3_NETWORK_LOADED':
      return { 
        ...state,
        network: action.payload.network,
        networkId: action.payload.networkId,
        scanner: action.payload.scanner,
        message: '' 
      }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.payload }
    case 'WEB3_BALANCE_LOADED':
      return { ...state, walletEthBalance: action.payload }
    case 'LOTTERY_CONTRACT_LOADED':
      return { ...state, lottery: action.payload }
    case 'UPDATE_MESSAGE':
      return { ...state, message: action.payload }
    case 'USER_DATA_LOADED':
      return { 
        ...state,
        manager: action.payload.manager,
        players: action.payload.players,
        lastWinner: action.payload.lastWinner,
        currentRound: action.payload.currentRound,
        poolBalance: action.payload.poolBalance,
      }
    case "updateEnteredStatus":
      return { ...state, isEntered: action.payload };
    case "setTheme":
      return { ...state, currentTheme: action.payload };
    case "updateTheme":
      return {
        ...state,
        currentTheme: { ...theme[state.currentTheme.id], ...action.payload }
      };
    case "toggleTheme": {
      const newThemeKey = state.currentTheme.id === "dark" ? "light" : "dark";
      return { ...state, currentTheme: theme[newThemeKey] };
    }
    case 'CLEAR':
      state = initialState
      return { ...state }
    default:
      return state;
  }
}