import { oneToNineteen, twoDigit, oneDigit, scales } from "@/constants";
import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  numberToWords(number) {
    if (number === 0) {
      return oneDigit[0] + " Rupees Zero Paise";
    }

    let wholeNumber = Math.floor(number);
    const decimalNumber = Math.round((number - wholeNumber) * 100);

    let wholeNumberWords = "";
    let scaleIndex = 0;

    while (wholeNumber > 0) {
      const numInThousand = wholeNumber % 1000;

      if (numInThousand !== 0) {
        const hundreds = Math.floor(numInThousand / 100);
        const remainder = numInThousand % 100;
        let numInWords = "";

        if (hundreds > 0) {
          numInWords += oneDigit[hundreds] + " Hundred";
        }

        if (remainder < 10) {
          numInWords += (numInWords !== "" ? " " : "") + oneDigit[remainder];
        } else if (remainder < 20) {
          numInWords +=
            (numInWords !== "" ? " " : "") + oneToNineteen[remainder];
        } else {
          numInWords +=
            (numInWords !== "" ? " " : "") +
            twoDigit[Math.floor(remainder / 10)];
          if (remainder % 10 !== 0) {
            numInWords += " " + oneDigit[remainder % 10];
          }
        }

        if (scaleIndex > 0) {
          numInWords += " " + scales[scaleIndex];
        }

        wholeNumberWords =
          wholeNumberWords !== ""
            ? numInWords + " " + wholeNumberWords
            : numInWords;
      }

      wholeNumber = Math.floor(wholeNumber / 1000);
      scaleIndex++;
    }

    let decimalNumberWords = "";
    if (decimalNumber > 0) {
      if (decimalNumber < 10) {
        decimalNumberWords = oneDigit[decimalNumber];
      } else if (decimalNumber < 20) {
        decimalNumberWords = oneToNineteen[decimalNumber];
      } else {
        decimalNumberWords =
          twoDigit[Math.floor(decimalNumber / 10)] +
          (decimalNumber % 10 !== 0 ? "-" + oneDigit[decimalNumber % 10] : "");
      }
    }

    return `Rupees ${wholeNumberWords} ${
      decimalNumberWords && ` and ${decimalNumberWords} Paise`
    }`;
  }

  render() {
    const { userInfo, incentive, losOfPay } = this.props;

    const total = (
      parseFloat(userInfo.newPay) +
      (incentive.length ? parseFloat(incentive) : 0) -
      (losOfPay.length ? parseFloat(losOfPay) : 0)
    ).toFixed(2);

    return (
      <div className="relativeCSS bg-white w-[100%]">
        <style type="text/css" media="print">
          {
            "\
              @page { size: A4; }\
            "
          }
        </style>
        <div className="flash" />

        <p className="text-center pt-12 text-black font-bold text-lg">
          Atomic Ads
        </p>
        <div className="m-4 ">
          <p className="text-black text-sm">Flat no 882,Sector 8,</p>
          <p className="text-black text-sm">Pin Code : 121006</p>
          <p className="text-black text-sm">Faridabad</p>
        </div>

        <p className="text-black mt-6 text-center font-bold font text-lg">
          Pay slip for the month of {userInfo.month} {userInfo.year}
        </p>

        <div className="grid grid-cols-2 m-4 mt-2 font">
          <table className="border border-black">
            <thead></thead>
            <tbody>
              <tr>
                <td className="border-b">Name:</td>
                <td className="border-l border-b">{userInfo.name}</td>
              </tr>
              <tr>
                <td className="border-b">Joining Date:</td>
                <td className="border-l border-b">{userInfo.joiningDate}</td>
              </tr>
              <tr>
                <td className="border-b">Designation:</td>
                <td className="border-l border-b">{userInfo.designation}</td>
              </tr>
              <tr>
                <td className="border-b">Location:</td>
                <td className="border-l border-b">{userInfo.location}</td>
              </tr>
              <tr>
                <td className="border-b">Department:</td>
                <td className="border-l border-b">{userInfo.department}</td>
              </tr>
              <tr>
                <td className="border-b">Effective Work Days:</td>
                <td className="border-l border-b">
                  {userInfo.workingDays} days
                </td>
              </tr>
              <tr>
                <td>Working Location:</td>
                <td className="border-l ">{userInfo.workingLocation}</td>
              </tr>
            </tbody>
          </table>
          <table className="border border-black border-l-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="border-b">Employee Id:</td>
                <td className="border-l border-b">{userInfo.employeeNo}</td>
              </tr>
              <tr>
                <td className="border-b">Gender:</td>
                <td className="border-l border-b">{userInfo.gender}</td>
              </tr>
              <tr>
                <td className="border-b">Mode of Payment Bank Name:</td>
                <td className="border-l border-b">{userInfo.modeofpayment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 m-4 mt-2  font">
          <table className="border border-black">
            <thead className="border border-black border-x-0">
              <tr>
                <th>Earnings</th>
                <th className="border-l">Actual Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b">BASIC:</td>
                <td className="text-right border-b border-l">
                  {userInfo.basic}
                </td>
              </tr>
              <tr>
                <td>HRA:</td>
                <td className="text-right border-l">{userInfo.HRA}</td>
              </tr>
              <tr>
                <td>DA:</td>
                <td className="text-right border-l">{userInfo.allowance}</td>
              </tr>
              <tr>
                <td className="border-b">Medical:</td>
                <td className="text-right border-b border-l">
                  {userInfo.medical}
                </td>
              </tr>
              {losOfPay ? (
                <tr>
                  <td className="border-b">Loss of pay:</td>
                  <td className="text-right border-b border-l">
                    - {parseFloat(losOfPay).toFixed(2)}
                  </td>
                </tr>
              ) : (
                <></>
              )}

              <tr>
                <td>INCENTIVES:</td>
                <td className="text-right border-l">
                  {incentive ? parseFloat(incentive).toFixed(2) : "Nil"}
                </td>
              </tr>
              <tr className="border-t border-black border-x-0">
                <td>Total Earnings: INR.</td>
                <td className="text-right border-l">{total}</td>
              </tr>
            </tbody>
          </table>
          <table className="border border-black border-l-0">
            <thead className="border border-black border-x-0">
              <tr>
                <th>Deductions</th>
                <th className="border-l">Actual Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b">PF:</td>
                <td className="text-right border-b border-l">Nil</td>
              </tr>
              <tr>
                <td>ESI</td>
                <td className="text-right border-l">Nil</td>
              </tr>
              <tr>
                <td></td>
                <td className="text-right border-l h-5"></td>
              </tr>
              <tr>
                <td></td>
                <td className="text-right border-l h-[22px]"></td>
              </tr>
              {losOfPay ? (
                <tr>
                  <td></td>
                  <td className="text-right border-l h-[22px]"></td>
                </tr>
              ) : (
                <></>
              )}

              <tr>
                <td className="border-t">PROF TAX</td>
                <td className="text-right border-l border-t">Nil</td>
              </tr>
              <tr className="border-t border-black border-x-0">
                <td>Total Deductions :INR</td>
                <td className="text-right border-l">Nil</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-black ml-4 mt-6 font">
          Net Pay for the month:{" "}
          <span className="text-black font-semibold">₹ {total}</span>
        </p>

        <p className="text-black ml-4 font">
          ( {this.numberToWords(parseFloat(total))} only )
        </p>

        <div className="border-t-black mx-4 border-2" />

        <p className="text-black mb-6 text-center font pb-12">
          This is a system generated pay slip and does not require a signature
        </p>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} text={props.text} />;
});
