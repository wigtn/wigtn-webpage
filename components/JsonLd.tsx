/* One JSON-LD block, rendered into the static HTML so a crawler reads it
 * without running the page. `<` is escaped so no string in the data can
 * close the script element early. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
