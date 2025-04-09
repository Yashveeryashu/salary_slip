import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { getEmployees } from "@/lib/getEmployees";

const EmpListPage = async () => {
  const users = await getEmployees();

  return (
    <main>
      <section className="flex justify-center pt-5 px-10 text-white">
        <div className="glass p-2">
          <table>
            <thead>
              <tr className="grid grid-cols-12 border-b-2 py-3">
                <th>Emp. Id</th>
                <th className="col-span-2 text-left">Name</th>
                <th className="col-span-2">Joining</th>
                <th className="col-span-2">Salary</th>
                <th className="col-span-2">Client</th>
                <th className="col-span-2">DOB</th>
                <th></th>
              </tr>
            </thead>
            <div className="max-h-[70vh] overflow-y-auto">
              <tbody className="divide-y">
                {users.map((emp) => {
                  const employee = {
                    ...emp._doc,
                    _id: emp._doc._id.toString(),
                  };
                  return (
                    <tr
                      key={emp._id}
                      className="grid gap-x-4 grid-cols-12 items-center divide-x"
                    >
                      <td className="text-center">{emp.employeeNo}</td>
                      <td className="col-span-2">{emp.name}</td>
                      <td className="col-span-2 text-center">
                        {emp.joiningDate}
                      </td>
                      <td className="col-span-2 text-center">
                        ₹ {parseInt(emp.totalSalary).toLocaleString("em-IN")}
                      </td>
                      <td className="col-span-2 text-center">
                        {emp.client ? emp.client : "_"}
                      </td>
                      <td className="col-span-2 text-center">
                        {emp.dob ? emp.dob : "_"}
                      </td>
                      <td className="py-2 flex gap-2">
                        <DeleteButton emp={employee} />
                        <EditButton emp={employee} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
          </table>
        </div>
      </section>
    </main>
  );
};
export default EmpListPage;
