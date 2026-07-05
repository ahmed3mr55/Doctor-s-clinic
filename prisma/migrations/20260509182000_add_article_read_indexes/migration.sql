-- Improve list queries that filter published articles and sort by recency.
CREATE INDEX "Article_published_createdAt_idx" ON "Article"("published", "createdAt" DESC);

-- Improve category-filtered article lists.
CREATE INDEX "Article_category_idx" ON "Article"("category");
