import { type ReactNode } from 'react';

type TableProps = {
  rows: { matchups: [ReactNode, ReactNode][] }[];
  courts: string[];
  handleCourtChange: (index: number, value: string) => void;
  completedRounds: boolean[];
  handleRoundComplete: (index: number) => void;
};

export function NCourtTable({
  rows,
  courts,
  handleCourtChange,
  completedRounds,
  handleRoundComplete,
}: TableProps) {
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
            <div
              className={[
                'round-card',
                completedRounds[index] ? 'round-complete' : '',
              ].join(' ')}
              key={index}
            >
              <div className="round-header">
                <span>Round {index + 1}</span>
                <button
                  className="round-check"
                  type="button"
                  aria-label={`Mark round ${index + 1} as ${completedRounds[index] ? 'incomplete' : 'complete'}`}
                  aria-pressed={completedRounds[index] ?? false}
                  onClick={() => handleRoundComplete(index)}
                >
                  {completedRounds[index] ? '✓' : ''}
                </button>
              </div>
              {matchups.map(([teamA, teamB], j) => {
                return (
                  <div className="court-row" key={j}>
                    <input
                      aria-label={`Court ${j + 1} name`}
                      className={[
                        'court-label',
                        'mobile-court-input',
                        j % 2 === 0 ? 'label-a' : 'label-b',
                      ].join(' ')}
                      type="text"
                      value={courts[j] ?? ''}
                      onChange={(event) =>
                        handleCourtChange(j, event.target.value)
                      }
                    />
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
