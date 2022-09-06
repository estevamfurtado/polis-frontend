import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";


import theme from './theme';

import { AppProvider } from "./contexts/AppContext";
import { RankingProvider } from "./contexts/RankingContext";
import { AlbumProvider } from "./contexts/AlbumContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DeckProvider } from "./contexts/DeckContext";

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
import AlbumHome from "./components/Album/Home";
import Stats from "./components/Album/Stats";
import PartiesSection from "./components/Album/Sections/PartiesSection";
import StatesSection from "./components/Album/Sections/StatesSection";

export default function App() {

  return (
    <ChakraProvider theme={theme}>
      <RankingProvider>
        <AlbumProvider>
          <AuthProvider>
            <DeckProvider>
              <AppProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<AppGrid />}>
                      <Route index element={<Home/>}/>
                        <Route element={<Wall/>}>
                          <Route path="album" element={<Album/>}>
                            <Route index element={<AlbumHome/>}/>
                            <Route path="stats" element={<Stats/>}/>
                            <Route path="sections">
                              <Route path="parties" element={<PartiesSection/>}/>
                              <Route path="states" element={<StatesSection/>}/>
                            </Route>
                          </Route>
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
              </AppProvider>
            </DeckProvider>
          </AuthProvider>
        </AlbumProvider>
      </RankingProvider>
    </ChakraProvider>
  )
}
