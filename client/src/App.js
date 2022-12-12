import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const Loading = React.lazy(() => import("./components/Loading"));
const Home = React.lazy(() => import("./pages/Home"));
const Detail = React.lazy(() => import("./pages/Detail"));
const Write = React.lazy(() => import("./pages/Write"));
const Edit = React.lazy(() => import("./pages/Edit"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const MyPage = React.lazy(() => import("./pages/MyPage"));
const WishList = React.lazy(() => import("./pages/WishList"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/reviews" element={<Home />} />
              <Route path="/reviews/:id" element={<Detail />} />
              <Route path="/write" element={<Write />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/wishlist" element={<WishList />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
