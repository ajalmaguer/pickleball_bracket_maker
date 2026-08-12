import { type ReactNode } from 'react';

type TableProps = {
  rows: { matchups: [ReactNode, ReactNode][] }[];
  courts: string[];
  handleCourtChange: (index: number, value: string) => void;
};

export function NCourtTable({ rows, courts, handleCourtChange }: TableProps) {
  return (
    <>
      <div className="table-view">
        <table>
          <thead>
            <tr>
              <th>Round</th>
              {courts.map((court, i) => (
                <th key={i}>
                  <div className="court-container">
                    <span
                      className={[
                        'court-badge',
                        i % 2 === 0 ? 'badge-a' : 'badge-b',
                      ].join(' ')}
                    >
                      <input
                        id={`court-${i}-input`}
                        type="text"
                        value={court}
                        onChange={(e) => handleCourtChange(i, e.target.value)}
                      />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ matchups }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {matchups.map(([teamA, teamB], j) => {
                    return (
                      <td key={j}>
                        <div className="matchup">
                          <span className="team">{teamA}</span>
                          <span className="vs">vs</span>
                          <span className="team">{teamB}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card-view">
        {rows.map(({ matchups }, index) => {
          return (
            <div className="round-card" key={index}>
              <div className="round-header">Round {index + 1}</div>
              {matchups.map(([teamA, teamB], j) => {
                return (
                  <div className="court-row" key={j}>
                    <span className="court-label label-a">{courts[0]}</span>
                    <div className="mobile-matchup">
                      <span className="mobile-team">{teamA}</span>
                      <span className="mobile-vs">vs</span>
                      <span className="mobile-team">{teamB}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
