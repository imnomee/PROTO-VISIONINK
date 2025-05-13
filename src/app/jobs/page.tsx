import Link from "next/link";
import { jobs } from "@/data/jobs";

const JobsListPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Jobs List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-700">{job.location}</p>
            <p className="text-gray-700">{job.salaryRange}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobsListPage;