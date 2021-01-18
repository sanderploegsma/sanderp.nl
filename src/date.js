import React from "react";
import { DateTime } from "luxon";

const FormattedDate = ({ date }) => {
  const dt = DateTime.fromISO(date);

  return (
    <span title={dt.toLocaleString(DateTime.DATE_HUGE)}>{dt.toRelative()}</span>
  );
};

export default FormattedDate;
