export function buildTree(
  data: any,
  parentSpanId: string | undefined,
  id: number
) {
  const children = data
    .filter((item: any) => item.parentSpanId === parentSpanId)
    .map((item: any) => ({
      id: id,
      operationName: item.operationName,
      spanId: item.spanId,
      startTime: item.startTime,
      duration: item.duration,
      children: buildTree(data, item.spanId, id + 1),
      attrs: {
        "service.name": item.attrs["service.name"],
        "aspecto.calc.class": item.attrs["aspecto.calc.class"],
        "db.system": item.attrs["db.system"],
        "messaging.system": item.attrs["messaging.system"],
      },
    }));

  return children;
}

export function assignNumbersToDates(dates: string[]): {
  numbers: number[];
  sortedDates: string[];
} {
  // Sort the dates in ascending order
  const sortedDates = dates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Get the oldest date
  const oldestDate = new Date(sortedDates[0]);

  // Assign numbers based on the chronological order
  const numbers = sortedDates.map((date) => {
    const current = new Date(date);
    const timeDifference = current.getTime() - oldestDate.getTime();
    return timeDifference; // Milliseconds
  });

  return { numbers, sortedDates };
}

export function getHighestDuration(data: any[]) {
  const durations = data.map((d) => d.duration);
  return durations.sort((a, b) => a - b)[durations.length - 1];
}
