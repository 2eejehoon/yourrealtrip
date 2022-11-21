import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

import Loading from "./components/Loading";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/write" element={<Write />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<SignUp />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/wishlist" element={<WishList />} /> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
