ALTER TABLE "movies" RENAME COLUMN "awards" TO "awards_old";
ALTER TABLE "movies" ADD COLUMN "awards" JSONB DEFAULT '[]'::jsonb;

UPDATE "movies" SET "awards" = (
  SELECT COALESCE(
    jsonb_agg(
      CASE
        WHEN elem ~ '^\{' THEN elem::jsonb
        ELSE jsonb_build_object('name', elem, 'awardList', '[]'::jsonb)
      END
    ),
    '[]'::jsonb
  )
  FROM unnest("awards_old") AS elem
);

ALTER TABLE "movies" DROP COLUMN "awards_old";
