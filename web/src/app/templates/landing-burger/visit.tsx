"use client";

import * as React from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { locations, today } from "./data";
import { Ico, icons } from "./icons";

const blocks: [number, number, number, number][] = [
  [20, 20, 90, 60], [130, 20, 70, 60], [262, 20, 60, 50], [342, 20, 120, 46], [482, 20, 98, 60],
  [20, 100, 90, 70], [130, 100, 70, 70], [300, 120, 70, 60], [452, 128, 128, 60],
  [20, 190, 90, 60], [300, 200, 90, 70], [410, 210, 70, 60], [500, 210, 80, 60],
  [20, 290, 70, 80], [110, 300, 90, 70], [310, 290, 80, 80], [492, 290, 88, 80],
];

function CityMap({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  return (
    <svg viewBox="0 0 600 400" className="hbl-bg-map-svg" role="group" aria-label="Map of our three New York shops">
      <rect width="600" height="400" fill="#141414" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#1c1c1c" stroke="#262626" />
      ))}
      <path d="M232 0 C214 70 262 120 246 190 C232 250 270 300 252 400 L292 400 C304 300 272 252 286 192 C300 120 252 70 270 0 Z" fill="#10212b" />
      <path d="M248 0 C232 70 278 120 264 190 C252 250 288 300 272 400" stroke="#1d3b4c" strokeWidth="1.5" fill="none" strokeDasharray="4 10" />
      <rect x="130" y="190" width="70" height="60" rx="6" fill="#16261a" stroke="#22382a" />
      <g fill="#2c5a3a" opacity="0.9">
        <circle cx="150" cy="210" r="7" />
        <circle cx="172" cy="226" r="9" />
        <circle cx="186" cy="206" r="6" />
      </g>
      <g stroke="#2a2a2a" strokeWidth="1" strokeDasharray="5 8">
        <path d="M0 90h232M0 180h240M0 280h250M292 110h308M292 196h308M292 280h308M120 0v400M420 0v400" />
      </g>
      <path d="M196 262 C230 250 252 236 300 242 S390 282 438 300" stroke="#ffc23d" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" fill="none" className="hbl-bg-map-route" />
      <path d="M396 92 C410 150 430 230 438 300" stroke="#ffc23d" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" fill="none" className="hbl-bg-map-route" opacity="0.6" />
      <g fontFamily="var(--font-grotesk)" fontSize="11" fill="#6f6f6f" letterSpacing="2">
        <text x="30" y="176">MANHATTAN</text>
        <text x="470" y="116">QUEENS</text>
        <text x="470" y="390">BROOKLYN</text>
        <text x="256" y="384" transform="rotate(-84 256 384)" fill="#3d6478">EAST RIVER</text>
      </g>
      {locations.map((l) => {
        const on = l.id === active;
        return (
          <g
            key={l.id}
            transform={`translate(${l.pin.x} ${l.pin.y})`}
            className="hbl-bg-pin"
            data-on={on}
            aria-hidden="true"
            onClick={() => onPick(l.id)}
          >
            {on && <circle r="30" fill="#ff3b2f" opacity="0.2" className="hbl-bg-map-pulse" />}
            <path d="M0 0c-12-14-18-21-18-30a18 18 0 0 1 36 0c0 9-6 16-18 30z" fill={on ? "#ff3b2f" : "#3a3a3a"} stroke="#0b0b0b" strokeWidth="3" />
            <circle cy="-30" r="6" fill={on ? "#ffc23d" : "#8a8a8a"} />
            <g transform="translate(-60 8)">
              <rect width="120" height="24" rx="12" fill={on ? "#ffc23d" : "#1f1f1f"} stroke={on ? "none" : "#333"} />
              <text x="60" y="16" textAnchor="middle" fontFamily="var(--font-grotesk)" fontSize="11" fontWeight="700" fill={on ? "#0b0b0b" : "#cfcfcf"}>
                {l.name.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function Visit() {
  const [active, setActive] = React.useState<string>(locations[0].id);
  const loc = locations.find((l) => l.id === active) ?? locations[0];
  const todayRow = loc.hours.find(([d]) => d === today);
  const isClosed = todayRow?.[1] === "Closed";
  const query = encodeURIComponent(`${loc.address}, ${loc.city}`);

  return (
    <section id="locations" className="hbl-bg-section hbl-bg-visit">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-head hbl-bg-head-split">
          <div className="hbl-bg-min0">
            <p className="hbl-bg-kicker">Locations &amp; hours</p>
            <h2 className="hbl-bg-h2">Three griddles. One city.</h2>
          </div>
          <div className="hbl-bg-loc-tabs" role="radiogroup" aria-label="Choose a shop">
            {locations.map((l) => (
              <button key={l.id} type="button" role="radio" aria-checked={active === l.id} data-on={active === l.id} onClick={() => setActive(l.id)}>
                {l.name}
              </button>
            ))}
          </div>
        </div>
        <div className="hbl-bg-visit-grid">
          <FadeInView className="hbl-bg-min0" distance={20}>
            <div className="hbl-bg-map">
              <CityMap active={active} onPick={setActive} />
              <div className="hbl-bg-map-bar">
                <div className="hbl-bg-min0">
                  <p className="hbl-bg-map-addr">
                    {loc.address}, {loc.city}
                  </p>
                  <p className="hbl-bg-muted hbl-bg-small">{loc.note}</p>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${query}`} className="hbl-bg-btn hbl-bg-btn-yellow" target="_blank" rel="noopener noreferrer">
                  <Ico size={16}>{icons.pin}</Ico>
                  Get directions
                </a>
              </div>
            </div>
          </FadeInView>
          <FadeInView className="hbl-bg-min0" distance={20} delay={0.1}>
            <div className="hbl-bg-hours">
              <div className="hbl-bg-hours-head">
                <h3 className="hbl-bg-h3">{loc.name} hours</h3>
                <span className="hbl-bg-open" data-closed={isClosed}>
                  <span className="hbl-bg-live-dot" aria-hidden="true" />
                  {isClosed ? "Closed today" : `Open today · closes ${todayRow?.[1].split(" – ")[1] ?? ""}`}
                </span>
              </div>
              <table className="hbl-bg-hours-table">
                <caption className="hbl-bg-sr">Opening hours for {loc.name} by day</caption>
                <tbody>
                  {loc.hours.map(([day, time]) => {
                    const isToday = day === today;
                    return (
                      <tr key={day} className={isToday ? "hbl-bg-today" : undefined} aria-current={isToday ? "date" : undefined}>
                        <th scope="row">
                          {day}
                          {isToday && <span className="hbl-bg-today-tag">Today</span>}
                        </th>
                        <td className={time === "Closed" ? "hbl-bg-closed" : undefined}>{time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul className="hbl-bg-visit-notes">
                <li>
                  <Ico size={16}>{icons.clock}</Ico>
                  <span>Current pickup wait about {loc.wait} minutes</span>
                </li>
                <li>
                  <Ico size={16}>{icons.phone}</Ico>
                  <a href={`tel:${loc.tel}`}>{loc.phone}</a>
                </li>
              </ul>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
