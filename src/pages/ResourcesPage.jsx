import React from "react";
import { Link } from "react-router-dom";

// Step 2: Import stored bills and check for types
const storedBills = JSON.parse(localStorage.getItem("bills")) || [];
const hasEssentialBills = storedBills.some(b => b.type === "Essential");
const hasFlexibleBills = storedBills.some(b => b.type === "Flexible");

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      <header className="mb-6">
        <Link to="/" className="text-blue-600 dark:text-yellow-400 underline">
          ← Back to Dashboard
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-4">Resources & Support</h1>

      {/* Step 3: Conditionally render support sections */}
      {hasEssentialBills && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Support for Essential Bills</h2>
          <ul className="list-disc ml-5">
            <li>
              <a href="https://www.turn2us.org.uk/" target="_blank" rel="noreferrer" className="underline">
                Help with energy and rent – Turn2Us
              </a>
            </li>
            <li>
              <a href="https://www.gov.uk/cost-of-living" target="_blank" rel="noreferrer" className="underline">
                Cost of Living Support – gov.uk
              </a>
            </li>
          </ul>
        </section>
      )}

      {hasFlexibleBills && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Cutting Non-Essentials</h2>
          <ul className="list-disc ml-5">
            <li>Consider pausing services like Netflix or Spotify if needed.</li>
            <li>Switch to free alternatives like LibreOffice, Deezer Free, or YouTube with ads.</li>
            <li>
              <a href="/savings" className="underline">
                See full list of cheaper alternatives →
              </a>
            </li>
          </ul>
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Charitable Help</h2>
        <ul className="list-disc ml-5">
          <li>
            <a href="https://www.turn2us.org.uk/" target="_blank" rel="noreferrer" className="underline">
              Turn2Us – Grants and Support
            </a>
          </li>
          <li>
            <a href="https://www.citizensadvice.org.uk/" target="_blank" rel="noreferrer" className="underline">
              Citizens Advice
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Debt Management</h2>
        <ul className="list-disc ml-5">
          <li>
            <a href="https://www.stepchange.org/" target="_blank" rel="noreferrer" className="underline">
              StepChange
            </a>
          </li>
          <li>
            <a href="https://www.nationaldebtline.org/" target="_blank" rel="noreferrer" className="underline">
              National Debtline
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Free Alternatives</h2>
        <ul className="list-disc ml-5">
          <li>ChatGPT → <a href="https://claude.ai/" className="underline">Claude.ai (Free)</a></li>
          <li>Spotify → <a href="https://www.deezer.com/en/offers/free" className="underline">Deezer Free</a></li>
        </ul>
      </section>
    </div>
  );
};

export default ResourcesPage;
