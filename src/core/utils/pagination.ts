export default function calculatePagination(
  page: number | undefined,
  pageNumber: number | undefined,
): { skip?: number; take?: number } {
  if (!page || !pageNumber) {
    return {};
  }
  const skip = (page - 1) * pageNumber;

  return { skip, take: pageNumber };
}
