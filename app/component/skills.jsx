"use client";
import React, { useState } from "react";

const Skills = ({ data }) => {
  const [activeTab, setActiveTab] = useState("soft");

  const setBg = (active) => (activeTab === active ? "bg-yellow" : "bg-grey");
  const setTabsAlignment = (tab) =>
    tab === "soft" ? "text-left" : "text-right";

  const tabs = (
    <div className="flex">
      {["soft", "hard"].map((el) => (
        <button
          key={el}
          type="button"
          className={`btn ${setBg(el)} ${setTabsAlignment(el)}`}
          onClick={() => setActiveTab(el)}
        >
          {el} Skills
        </button>
      ))}
    </div>
  );
  const content = (
    <ul
      className={`flex flex-row flex-wrap content-start list-none py-4 gap-2 ${
        activeTab === "soft" ? "justify-start" : "justify-start"
      }`}
    >
      {data[activeTab].map(({ icon, text }) => (
        <li key={text} className="skill">
          <div className="flex items-center justify-center gap-1">
            <span style={{ color: "#1f2937" }}>{icon} </span>
            {text}
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      {tabs}
      {content}
    </div>
  );
};

export default Skills;
