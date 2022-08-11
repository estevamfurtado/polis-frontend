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
import AlbumSection from "./pages/AlbumSection";
import Pages from "./pages/Pages";

export default function App() {
  return (
    <DataProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppGrid />}>
              <Route index element={<></>}/>
              <Route path="/about" element={<></>}/>
              <Route path="/ranking" element={<RankingPage/>}/>
              <Route path="/album" element={<AlbumSection/>}/>
              <Route path="/album/pages" element={<Pages/>}/>
              <Route path="/album/deck" element={<></>}/>
              <Route path="/sign-in" element={<SignInPage/>}/>
              <Route path="/sign-up" element={<SignUpPage/>}/>
              <Route path="/user" element={<EditInfoPage/>}/>
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </DataProvider>
  )
}
