export default function SectionHeading({ eyebrow, children }) {
  return (
    <>
      <small className="eyebrow">{eyebrow}</small>
      <h2>{children}</h2>
    </>
  );
}
