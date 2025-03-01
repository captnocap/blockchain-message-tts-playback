import React, { useState, useEffect } from "react";

type Donation = {
  txHash: string;
  amount: number;
  message: string;
};

const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetch("/donations")
      .then((res) => res.json())
      .then(setDonations);
  }, []);

  return (
    <div>
      <h2>Recent Donations</h2>
      {donations.map((d) => (
        <div key={d.txHash}>
          <p>
            <strong>{d.amount} ETH/SOL/XMR</strong>
          </p>
          <p>{d.message}</p>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
