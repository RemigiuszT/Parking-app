import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";
import MainScreen from "./screens/MainScreen";
import ParkingAreas from "./screens/ParkingAreas";

const ParkingAreaManagement = React.lazy(
  () => import("./screens/ParkingAreaManagment")
);
const PaymentCalculator = React.lazy(
  () => import("./screens/PaymentCalculator")
);

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/parking-areas" element={<ParkingAreas />} />
            <Route
              path="/parking-area-management"
              element={<ParkingAreaManagement />}
            />
            <Route path="/calculate-payment" element={<PaymentCalculator />} />
          </Routes>
        </Suspense>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
};

export default RootRouter;
