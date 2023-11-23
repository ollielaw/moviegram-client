export const timestampToDynamic = (timestamp) => {
  const millisecsAgo = new Date() - timestamp;
  let secsAgo = millisecsAgo / 1000;
  if (secsAgo < 1) {
    return "Now";
  }
  if (secsAgo < 60) {
    secsAgo = Math.floor(secsAgo);
    if (secsAgo === 1) {
      return "1 second ago";
    }
    return `${secsAgo} seconds ago`;
  }
  let minsAgo = secsAgo / 60;
  if (minsAgo < 60) {
    minsAgo = Math.floor(minsAgo);
    if (minsAgo === 1) {
      return "1 minute ago";
    }
    return `${minsAgo} minutes ago`;
  }
  let hoursAgo = minsAgo / 60;
  if (hoursAgo < 24) {
    hoursAgo = Math.floor(hoursAgo);
    if (hoursAgo === 1) {
      return "1 hour ago";
    }
    return `${hoursAgo} hours ago`;
  }
  let daysAgo = hoursAgo / 24;
  if (daysAgo < 365) {
    daysAgo = Math.floor(daysAgo);
    if (daysAgo === 1) {
      return "1 day ago";
    }
    return `${daysAgo} days ago`;
  }
  let yearsAgo = daysAgo / 365;
  yearsAgo = Math.floor(yearsAgo);
  if (yearsAgo === 1) {
    return "1 year ago";
  }
  return `${yearsAgo} years ago`;
};
