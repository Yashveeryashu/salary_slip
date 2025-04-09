export default function YearBreaKDown({ payments }) {
  const monthBasic = payments.basic.split(".");
  const monthHRA = payments.HRA.split(".");
  const monthMedical = payments.medical.split(".");
  const monthAllowance = payments.allowance.split(".");
  const monthNewPay = payments.newPay.split(".");

  const yearBasic = (payments.basic * 12).toFixed(2).split(".");
  const yearHRA = (payments.HRA * 12).toFixed(2).split(".");
  const yearMedical = (payments.medical * 12).toFixed(2).split(".");
  const yearAllowance = (payments.allowance * 12).toFixed(2).split(".");
  const yearNewPay = (payments.newPay * 12).toFixed(2).split(".");

  return (
    <div className="flex flex-col mt-4 justify-center items-center">
      <div className="p-5  glass">
        <p className="text-xl font-semibold mb-2 border-b">
          Salary breakdown :
        </p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-1">
          <p></p>
          <p className="text-center min-w-[100px]">Montly</p>
          <p className="text-center">Yearly</p>
          <div />
          <div className="border-t" />
          <div className="border-t" />
          <p>Basic :</p>
          <p className="text-right">
            {parseInt(monthBasic[0]).toLocaleString("em-IN")}.{monthBasic[1]}
          </p>
          <p className="text-right">
            {parseInt(yearBasic[0]).toLocaleString("em-IN")}.{yearBasic[1]}
          </p>
          <p>HRA :</p>
          <p className="text-right">
            {parseInt(monthHRA[0]).toLocaleString("em-IN")}.{monthHRA[1]}
          </p>
          <p className="text-right">
            {parseInt(yearHRA[0]).toLocaleString("em-IN")}.{yearHRA[1]}
          </p>
          <p>Medical :</p>
          <p className="text-right">
            {parseInt(monthMedical[0]).toLocaleString("em-IN")}.
            {monthMedical[1]}
          </p>
          <p className="text-right">
            {parseInt(yearMedical[0]).toLocaleString("em-IN")}.{yearMedical[1]}
          </p>
          <p>Allowance :</p>
          <p className="text-right">
            {parseInt(monthAllowance[0]).toLocaleString("em-IN")}.
            {monthAllowance[1]}
          </p>
          <p className="text-right">
            {parseInt(yearAllowance[0]).toLocaleString("em-IN")}.
            {yearAllowance[1]}
          </p>
          <div className="border-t" />
          <div className="border-t" />
          <div className="border-t" />
          <p>Net Pay :</p>
          <p className="text-right">
            ₹ {parseInt(monthNewPay[0]).toLocaleString("em-IN")}.
            {monthNewPay[1]}
          </p>
          <p className="text-right">
            ₹ {parseInt(yearNewPay[0]).toLocaleString("em-IN")}.{yearNewPay[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
