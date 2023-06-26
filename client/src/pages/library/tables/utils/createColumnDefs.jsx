
export function createColumnDefs({data, sortable}) {
  if(!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const item = data[0];
  let keys = Object.keys(item);
  keys.splice(0, 1)

  const columnDefs = keys.map(key => {
    return { field: key, sortable: sortable };
  });

  return columnDefs;
}