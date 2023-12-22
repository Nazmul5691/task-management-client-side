/* eslint-disable react/prop-types */


const AudienceCard = ({ audience }) => (
  <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-indigo-600">{audience}</div>
      <p className="text-gray-700 text-base">
      <p className="text-gray-700 text-base">This website offers valuable resources, tutorials, and tools tailored for developers, providing content for both beginners learning to code and experienced developers.</p>
 {audience.toLowerCase()}.
      </p>
    </div>
  </div>
);

const Audience = () => {
  const targetAudiences = ['Developers', 'Corporate Professionals', 'Bankers'];

  return (
    <section className="mt-8 p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600 text-center">Who Can Benefit from This Website?</h2>
      <p className="text-gray-700 mb-4 text-center">
        This website is designed to cater to a diverse audience. Here are some of the people who can benefit from it:
      </p>

      <div className="flex flex-wrap justify-center">
        {targetAudiences.map((audience, index) => (
          <AudienceCard key={index} audience={audience} />
        ))}
      </div>
    </section>
  );
};

export default Audience;
