interface SectionHeadingProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${centered ? 'text-center' : ''} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      <p className="text-xl text-gray-300">
        {subtitle}
      </p>
    </div>
  );
}