export function CodeBlock({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <pre {...props} className="lh-fg lh-round">
      <code className={`language-text`}>{children}</code>
    </pre>
  );
  return <div className="lh-fg">{children}</div>;
}
