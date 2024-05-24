import React from "react";

function PasswordViewTable(props) {
  let data = props.data;
  // console.log(data);
  
  return (
    <div className="overflow-x-auto relative shadow-md rounded-lg mx-10 mb-10">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-emerald-500  ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Site Name
            </th>
            <th scope="col" className="py-3 px-6">
              Username
            </th>
            <th scope="col" className="py-3 px-6">
              Password
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-emerald-50 border-b hover:bg-emerald-100  "
            >
              <td className="py-4 px-6">{item.siteName}</td>
              <td className="py-4 px-6">{item.username}</td>
              <td className="py-4 px-6 flex  space-x-2  items-center">
                <span>{item.password} </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-teal-600 hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-3.536a2.5 2.5 0 011.768 4.268l-3.536-3.536a2.5 2.5 0 01-4.268-1.768m4.268 1.768L5.75 16.75a2 2 0 002 2h6m3 0a2 2 0 002-2v-6l-6-6z"
                      />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PasswordViewTable;
