export function convertToCSV(arr): string {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      const values = Object.values(it);
      console.log(values);

      const mapped = values.map((value: any) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });

      return mapped.toString();
    })
    .join('\n');
}
