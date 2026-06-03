type Params = {
  search?: string;
  searchby?: string;
  page?: string;
  pagesize?: string;
  sort?: string;
  sortby?: string;
};

export const isDefaultQuery = (params?: Params): boolean => {
  const search = params?.search?.trim();
  const page = params?.page?.trim();
  const pagesize = params?.pagesize?.trim();
  const sort = params?.sort?.trim();
  const sortby = params?.sortby?.trim();

  return (
    !search &&
    (!page || page === "1") &&
    !pagesize &&
    (!sort || sort === "desc") &&
    !sortby
  );
};
