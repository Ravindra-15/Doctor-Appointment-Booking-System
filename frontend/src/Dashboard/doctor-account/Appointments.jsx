import React from "react";

const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Gender</th>
          <th scope="col" className="px-6 py-3">Payment</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Booked on</th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => {
          const user = item?.user;

          return (
            <tr key={item._id}>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                {user ? (
                  <>
                    <img
                      src={user.photo}
                      className="w-10 h-10 rounded-full"
                      alt={user.name}
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="text-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-red-500">User not found</div>
                )}
              </th>

              <td className="px-6 py-4">{item.gender || "-"}</td>

              <td className="px-6 py-4">
                {item.isPaid ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    Paid
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Unpaid
                  </div>
                )}
              </td>

              <td className="px-6 py-4">{item.price || "N/A"}</td>
              <td className="px-6 py-4">{item.createdAt?.slice(0, 10) || "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Appointments;
