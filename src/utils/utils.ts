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
      children: buildTree(data, item.spanId, id + 1),
    }));

  return children;
}
