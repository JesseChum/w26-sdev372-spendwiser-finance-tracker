import './App.css'
import { useEffect } from "react";
import DashboardForm from './components/DashboardForm';
import SavingsChart from "./components/SavingsChart";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/';

function App() {

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then(res => res.json())
      .then(data => {
        console.log("Backend says:", data);
      })
      .catch(err => {
        console.error("Frontend → Backend failed:", err);
      });
  }, []);

  // TEMPORARY test data so the chart renders
  const demoExpenses = [
    { amount: 15 },
    { amount: 150 },
    { amount: 1500 }
  ];

  return (
    <>
      <DashboardForm />

      <div style={{width: "300px", margin: "40px auto"}}>
        <SavingsChart expenses={demoExpenses} />
      </div>
    </>
  )
}

export default App;