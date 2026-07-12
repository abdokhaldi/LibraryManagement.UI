import { LOAN_STATUS_STYLES } from "../../constants";

export function LoanStatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${LOAN_STATUS_STYLES[status] || LOAN_STATUS_STYLES.Returned}`}>
      {status}
    </span>
  );
}