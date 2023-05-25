export function buildTree(data: any, parentSpanId: string | undefined) {
  const children = data
    .filter((item: any) => item.parentSpanId === parentSpanId)
    .map((item: any) => ({
      spanId: item.spanId,
      children: buildTree(data, item.spanId),
    }));

  return children;
}
