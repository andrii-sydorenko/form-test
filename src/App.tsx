import { useState, type ChangeEvent } from "react";
import "./index.css";

const COMPANIES = [
  { name: "dev-vortexrestaurantequipment.pantheon.io", techSpend: 0 },
  { name: "goaccess.kpmg.com", techSpend: 0 },
  { name: "qa-dashboard-edge.ihg.com", techSpend: 0 },
  { name: "oecexcellence.gehealthcare.com", techSpend: 0 },
  { name: "ads.scotiabank.com/*", techSpend: 0 },
  { name: "onboardinghub-stage.mastercard.com", techSpend: 0 },
  { name: "agilent.com", techSpend: 0 },
];

const RowItem = ({ name, techSpend }: { name: string, techSpend: number }) => {
  const [val, setVal] = useState(techSpend);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setVal(Number(value));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <span>{name}</span>
      <input value={val} onChange={handleChange} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      {COMPANIES.map(({ name, techSpend }) => {
        return <RowItem name={name} techSpend={techSpend} />;
      })}
    </div>
  );
}
