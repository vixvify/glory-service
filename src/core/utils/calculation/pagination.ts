export default function calculatePagination(
  page: number | undefined,
  pageSize: number | undefined,
): { skip?: number; take?: number } {
  if (!page || !pageSize) {
    return {};
  }
  const skip = (page - 1) * pageSize;

  return { skip, take: pageSize };
}

