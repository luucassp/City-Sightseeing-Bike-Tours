export default function TheTourPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold text-brand-dark">The Tour</h1>
      <p className="mt-6 text-gray-700">
        Describe here the duration, meeting point, what&apos;s included and
        recommendations for participants.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>Duration: 2 hours 30 minutes</li>
        <li>Small groups (max. 12 people)</li>
        <li>Safety equipment included</li>
        <li>Local guide, multiple languages spoken</li>
      </ul>
    </div>
  );
}
