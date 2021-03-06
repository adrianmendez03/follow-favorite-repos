import React from "react";
import PaginatedTable from "../shared/Paginator";
import Spinner from "../shared/Spinner";
import { useFetch } from "../shared/Hooks";

import "../shared/Table.css";

const Issues = ({ selectedRepo }) => {
  const url = `https://api.github.com/repos/${selectedRepo.url}/issues?per_page=50`;
  const { response: issues, loading: waiting, error } = useFetch(url);

  return (
    <div className="table-wrap">
      <PaginatedTable options={{ data: issues || [], pageSize: 10 }}>
        {({ data: issues }) => (
          <>
            {error && <>Some error occurred</>}
            {waiting && <Spinner />}
            {!!issues.length && (
              <table>
                <thead>
                  <tr>
                    <th>title</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map(({ number, title }) => (
                    <tr key={number}>
                      <td>
                        <div className="table-text">{title}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </PaginatedTable>
    </div>
  );
};

export default Issues;
