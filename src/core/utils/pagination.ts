export default function calculatePagination(page: number, pageNumber: number) {
  const skip = (page - 1) * pageNumber;

  return { skip, take: pageNumber };
}
