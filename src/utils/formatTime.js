export const formattedTimestamp = (timestamp) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    return new Date(timestamp).toLocaleString('en-US', options);
  };