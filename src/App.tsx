import { useState, type ChangeEvent } from "react";
import "./index.css";

type Company = { name: string; techSpend: number };

const COMPANIES: Company[] = [
  { name: "dev-vortexrestaurantequipment.pantheon.io", techSpend: 0 },
  { name: "goaccess.kpmg.com", techSpend: 0 },
  { name: "qa-dashboard-edge.ihg.com", techSpend: 0 },
  { name: "oecexcellence.gehealthcare.com", techSpend: 0 },
  { name: "ads.scotiabank.com/*", techSpend: 0 },
  { name: "onboardinghub-stage.mastercard.com", techSpend: 0 },
  { name: "agilent.com", techSpend: 0 },
];

const RowItem = ({
  name,
  techSpend,
  onEdit,
}: {
  name: string;
  techSpend: number | string;
  onEdit: () => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
        padding: "8px 12px",
        border: "1px solid var(--border)",
        borderRadius: 6,
      }}
    >
      <span>{name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--mono)" }}>{techSpend}</span>
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

const EditModal = ({
  company,
  onClose,
  onSave,
}: {
  company: Company;
  onClose: () => void;
  onSave: (value: string) => void;
}) => {
  const [val, setVal] = useState<string>(String(company.techSpend));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave(val);
        }}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: 24,
          minWidth: 320,
          boxShadow: "var(--shadow)",
          textAlign: "left",
        }}
      >
        <h2>{company.name}</h2>
        <label
          style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}
        >
          Value
          <input
            autoFocus
            aria-label="value"
            value={val}
            onChange={handleChange}
          />
        </label>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default function App() {
  const [values, setValues] = useState<Record<string, string | number>>(() =>
    Object.fromEntries(COMPANIES.map((c) => [c.name, c.techSpend])),
  );
  const [editing, setEditing] = useState<Company | null>(null);

  return (
    <div className="App">
      {COMPANIES.map((c) => (
        <RowItem
          key={c.name}
          name={c.name}
          techSpend={values[c.name]}
          onEdit={() => setEditing(c)}
        />
      ))}
      {editing && (
        <EditModal
          company={editing}
          onClose={() => setEditing(null)}
          onSave={(value) => {
            setValues((prev) => ({ ...prev, [editing.name]: value }));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
