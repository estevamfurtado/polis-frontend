import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppGrid from "./pages/AppGrid";
import { DataProvider } from "./contexts/DataContext";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import EditInfoPage from "./pages/EditInfoPage";
import RankingPage from "./pages/RankingPage";

import AlbumIntroPage from "./pages/AlbumIntroPage";
import AlbumPagesPage from "./pages/AlbumPagesPage";
import Album from "./pages/Album";

import DeckPage from "./pages/DeckPage";
import PacksPage from "./pages/PacksPage";
import ExchangePage from "./pages/ExchangePage";
import Home from "./pages/Home";
import ReferralLandingPage from "./pages/ReferralLandingPage";


export default function App() {
  return (
    <DataProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppGrid />}>
              <Route index element={<Home/>}/>
              <Route path="/ranking" element={<RankingPage/>}/>
              <Route path='/album' element={<Album/>}>
                <Route index element={<AlbumIntroPage/>}/>
                <Route path="pages" element={<AlbumPagesPage/>}/>
                <Route path="deck" element={<DeckPage/>}/>
                <Route path="packs" element={<PacksPage/>}/>
                <Route path="exchange" element={<ExchangePage/>}/>
              </Route>
              <Route path="/sign-in" element={<SignInPage/>}/>
              <Route path="/sign-up" element={<SignUpPage/>}/>
              <Route path="/user" element={<EditInfoPage/>}/>
              
              <Route path="/referral" element={<ReferralLandingPage/>}/>
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </DataProvider>
  )
}
