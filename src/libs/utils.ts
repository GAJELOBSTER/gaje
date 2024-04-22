import { IPaginationQuery } from "@/types/commonType";

export const isSuccessStatus = (statusCode: number | undefined) => statusCode === 200 || statusCode === 201;

export const formatDate = (isoDateString: Date) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const convertQueryString = (query: IPaginationQuery) => {
  let querystring = `page=${query.page}&size=${query.size}`;
  if (query.searchField) querystring += `&searchField=${query.searchField}`;
  if (query.searchWord) querystring += `&searchWord=${query.searchWord}`;
  if (query.order) querystring += `&order=${query.order}`;
  if (query.orderBy) querystring += `&orderBy=${query.orderBy}`;
  return querystring;
};
