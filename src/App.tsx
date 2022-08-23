import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { DataProvider } from "./contexts/DataContext";

import AppGrid from "./pages/AppGrid";

import Home from "./pages/HomePage";

import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Referral from "./pages/ReferralLandingPage";


import Wall from "./pages/Wall";
import Album from "./pages/AlbumPage";
import Stickers from "./pages/StickersPage";
import Games from "./pages/GamesPage";
import Exchange from "./pages/ExchangePage";
import CreateExchange from "./components/CreateExchange";
import ViewExchange from "./components/ViewExchange";

import theme from './theme';


export default function App() {
  return (
    <DataProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<AppGrid />}>
                  <Route index element={<Home/>}/>
                  <Route element={<Wall/>}>
                    <Route path="album" element={<Album/>}/>
                    <Route path="stickers" element={<Stickers/>}/>
                    <Route path="exchange" element={<Exchange/>}>
                      <Route index element={<></>}/>
                      <Route path="new" element={<CreateExchange/>}/>
                      <Route path=":requestId" element={<ViewExchange/>}/>
                    </Route>
                    <Route path="games" element={<Games/>}/>
                  </Route>
                  <Route path="sign-in" element={<SignIn/>}/>
                  <Route path="sign-up" element={<SignUp/>}/>              
                  <Route path="referral" element={<Referral/>}/>
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
    </DataProvider>
  )
}
