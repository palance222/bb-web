import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context as context } from "../../shared/context";
import './account-details.scss'

const Accounts = () => {
  const auth = context();
  let route =  useLocation(); 
  const [accountsData, setAccounts] = useState<any>({
    loan: {dataKey: 'loans', data: {}},
    deposit: {dataKey: 'account', data: {}},
  });

  const dateFormatter = (data:any) => {
    const date = new Date(data);
    const month:any = date.toLocaleString('default', {month: 'numeric'});
    const year:any = date.toLocaleString('default', {year: 'numeric'});
    console.log("date:", (month > 9 ? month : ('0' + month)) + '-' + date.getDate() + '-' + year);
    return (month > 9 ? month : ('0' + month)) + '-' + date.getDate() + '-' + year;
  };

  const columns:any = {
    loans: [
      {
        loanNumber: {
          text: 'Loan Number',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {
        productName: {
          text: 'Loan Poduct Name',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {principalBalance: {text: 'Loan Balance', style: {fontSize: 16}}},
      {
        branchName: {
          text: 'Loan Branch Name',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {
        maturityDate: {
          text: 'Maturity Date',
          style: {fontSize: 16, fontWeight: 'bold'},
          formatter: dateFormatter,
        },
      },
      {
        grantDate: {
          text: 'Next Payment Due Date',
          style: {fontSize: 16, fontWeight: 'bold'},
          formatter: dateFormatter,
        },
      },
      {
        status: {
          text: 'Loan Status',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {term: {text: 'Tenure', style: {fontSize: 16}}},
    ],
    account: [
      {
        accountNumber: {
          text: 'Account Number',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {
        productName: {
          text: 'Deposit Name',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {availableBalance: {text: 'Available Balance', style: {fontSize: 16}}},
      {
        branchName: {
          text: 'Account Branch Name',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {
        maturityDate: {
          text: 'Maturity Date',
          style: {fontSize: 16, fontWeight: 'bold'},
          formatter: dateFormatter,
        },
      },
      {
        interestBalance: {
          text: 'Interest Balance',
          style: {fontSize: 16, fontWeight: 'bold'},
        },
      },
      {term: {text: 'Tenure', style: {fontSize: 16}}},
    ],
  };

  const columns1:any = {
    payments: [
      {
        postedDate: {
          text: 'Payment Date',
          style: {fontSize: 16, fontWeight: 'bold'},
          formatter: dateFormatter,
        },
      },
      {amount: {text: 'Amount', style: {fontSize: 16}}},
    ],
    transactions: [
      {
        postedDate: {
          text: 'Payment Date',
          style: {fontSize: 14, fontWeight: 'bold'},
          formatter: dateFormatter,
        },
      },
      {
        transactionType: {
          text: 'Type',
          style: {fontSize: 14},
        },
      },
      {amount: {text: 'Amount', style: {fontSize: 14}}},
    ],
  };
  
  const method = accountsData[route.state.type];
  const details = method['data'] ? method['data'] : {};
  useEffect(() => {
    auth.findAccounts(route.state.type, route.state.viewId).then((data:any) => {
      setAccounts((prevState:any) => {
        if (method.dataKey === 'loans') {
          return {
            ...prevState,
            [route.state.type]: {...method, data: data['loan']},
          };
        } else {
          return {
            ...prevState,
            [route.state.type]: {...method, data: data[method['dataKey']]},
          };
        }
      });
    });
  }, []);

  const [transData, setTrans] = useState<any>({
    loan: {dataKey: 'payments', data: [], search: []},
    deposit: {dataKey: 'transactions', data: [], search: []},
    loading: false,
  });
  const [query, setQuery] = useState<any>('');

  const method2 = transData[route.state.type];
  const details2 = method2['data'] ? method2['data'] : [];
  const search = method2['search'] ? method2['search'] : [];

  useEffect(() => {
    setTrans((prevState:any) => ({
      ...prevState,
      loading: true,
    }));
    auth
      .listTrans(route.state.type, route.state.type1, route.state.viewId)
      .then((data:any) => {
        setTrans((prevState:any) => {
          return {
            ...prevState,
            [route.state.type]: {
              ...method2,
              data: data[route.state.type1],
              search: data[route.state.type1],
            },
            loading: false,
          };
        });
      });
  }, []);

  const handleSearch = (text:any) => {
    const formattedQuery = text.target.value;
    let filteredData = details2.filter((item:any) => {
      return dateFormatter(item.postedDate).includes(formattedQuery);
    });

    if (formattedQuery === '') {
      filteredData = details2;
    }
    setTrans((prevState:any) => {
      return {
        ...prevState,
        [route.state.type]: {...method2, search: filteredData},
        loading: false,
      };
    });
    setQuery(formattedQuery);
  };
 
  return (
    <div className="width100">
      <h1 className="mt-1 mb-4 page-title">Loan details</h1>
      {Object.keys(details).length ? (
        <div className="col-md-6">
          <ul className="list-group bg-body-tertiary border rounded-3 mb-3">
            {columns[method['dataKey']].map((item:any, index:any) => {
              const keyItem = Object.keys(item)[0];
              return (
                <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item[keyItem].text}</h6>
                  </div>
                  <span className="text-body-secondary">{item[keyItem].formatter ? item[keyItem].formatter(details[keyItem]) : details[keyItem]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (<div className="container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      )}
      <div className="col-md-4">
        <div className="bg-body-tertiary border rounded-3 mb-3">
          <div className="input-group">
            <input
              className="form-control"
              autoCapitalize="none"
              value={query}
              onChange={handleSearch}
              placeholder="Search by payment date (mm-dd-yyyy)"
            />
          </div>
        </div>
      </div>
      <table className="table table-striped table-bb">
        <thead className="table-light">
          <tr>
            {columns1[method2['dataKey']].map((item:any, index:any) => {
              console.log("data",item);
              const keyItem = Object.keys(item)[0];
              return (
                <th key={index} scope="col">{item[keyItem].text}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {search.map((data: any) => {
            return (
              <tr>
                {columns1[method2['dataKey']].map((item:any, index:any) => {
                const keyItem = Object.keys(item)[0];
                return (
                  <td key={index} scope="row">{data[keyItem]}</td>
                )
              })}
              </tr>
            );
          })}
          {transData.loading && 
            <tr>
              <td colSpan={3} className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          }
          {(!search.length && !transData.loading) &&
            <tr>
              <td className="text-center pt-3 pb-3 border-bottom" colSpan={3}>
                No records
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default Accounts;

